import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Proposal,
  ProposalStatus,
  User,
} from './../../entities/entities.entity';
import { CreateProposalDto } from '../../dtos/proposal/create-proposal.dto';
import { UpdateProposalDto } from '../../dtos/proposal/update-proposal.dto';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async validateUserOwnership(
    userId: number,
    proposalId: number,
  ): Promise<Proposal> {
    const proposal = await this.proposalRepository.findOne({
      where: { id: proposalId, userCreator: { id: userId } },
    });
    if (!proposal) {
      throw new NotFoundException(
        'Proposta não encontrada ou não pertence ao usuário',
      );
    }
    return proposal;
  }

  async createProposal(
    createProposalDto: CreateProposalDto,
    user: User,
  ): Promise<Proposal> {
    const proposal = this.proposalRepository.create({
      ...createProposalDto,
      userCreator: user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.proposalRepository.save(proposal);
  }

  async findOne(id: number, user: User): Promise<Proposal> {
    return await this.validateUserOwnership(user.id, id);
  }

  async findAllByUser(user: User): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      where: { userCreator: { id: user.id } },
    });
  }

  async findAllByStatus(
    user: User,
    status?: ProposalStatus,
  ): Promise<Proposal[]> {
    const proposals = await this.findAllByUser(user);
    if (status) {
      return proposals.filter((proposal) => proposal.status === status);
    }
    return proposals;
  }

  async approveProposal(id: number, user: User): Promise<Proposal> {
    const proposal = await this.validateUserOwnership(user.id, id);

    if (proposal.status !== ProposalStatus.PENDING) {
      throw new BadRequestException('Proposta não está pendente');
    }

    proposal.status = ProposalStatus.SUCCESSFUL;
    proposal.updatedAt = new Date();
    user.balance += proposal.profit;
    await this.userRepository.save(user);

    return await this.proposalRepository.save(proposal);
  }

  async getProfitByStatus(): Promise<any> {
    const query = this.proposalRepository
      .createQueryBuilder('proposal')
      .select('user.id', 'userId')
      .addSelect('user.name', 'fullName')
      .addSelect(
        'SUM(CASE WHEN proposal.status = :successful THEN proposal.profit ELSE 0 END)',
        'successfulProfit',
      )
      .addSelect(
        'SUM(CASE WHEN proposal.status = :pending THEN proposal.profit ELSE 0 END)',
        'pendingProfit',
      )
      .addSelect(
        'SUM(CASE WHEN proposal.status = :refused THEN proposal.profit ELSE 0 END)',
        'refusedProfit',
      )
      .addSelect(
        'SUM(CASE WHEN proposal.status = :error THEN proposal.profit ELSE 0 END)',
        'errorProfit',
      )
      .innerJoin('proposal.userCreator', 'user')
      .groupBy('user.id')
      .addGroupBy('user.name')
      .setParameters({
        successful: ProposalStatus.SUCCESSFUL,
        pending: ProposalStatus.PENDING,
        refused: ProposalStatus.REFUSED,
        error: ProposalStatus.ERROR,
      });

    const result = await query.getRawMany();

    // Estruturação da resposta
    return result.map((row) => ({
      userId: row.userId,
      fullName: row.fullName,
      profits: {
        PENDING: parseFloat(row.pendingProfit) || 0,
        SUCCESSFUL: parseFloat(row.successfulProfit) || 0,
        REFUSED: parseFloat(row.refusedProfit) || 0,
        ERROR: parseFloat(row.errorProfit) || 0,
      },
    }));
  }

  async update(
    id: number,
    updateProposalDto: UpdateProposalDto,
    user: User,
  ): Promise<Proposal> {
    const proposal = await this.validateUserOwnership(user.id, id);
    Object.assign(proposal, updateProposalDto);
    proposal.updatedAt = new Date();
    return await this.proposalRepository.save(proposal);
  }

  async remove(id: number, user: User): Promise<void> {
    const proposal = await this.validateUserOwnership(user.id, id);
    await this.proposalRepository.remove(proposal);
  }
}
