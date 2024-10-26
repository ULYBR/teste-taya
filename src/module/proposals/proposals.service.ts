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
    const proposal = await this.proposalRepository.findOne({
      where: { id, userCreator: user },
    });
    if (!proposal) {
      throw new NotFoundException(
        'Proposal not found or does not belong to the user',
      );
    }
    return proposal;
  }

  async findAll(user: User): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      where: { userCreator: user, status: ProposalStatus.PENDING },
    });
  }

  async findRefused(user: User): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      where: { userCreator: user, status: ProposalStatus.REFUSED },
    });
  }

  async approveProposal(id: number, user: User): Promise<Proposal> {
    const proposal = await this.findOne(id, user);

    if (proposal.status !== ProposalStatus.PENDING) {
      throw new BadRequestException('Proposal is not pending');
    }

    proposal.status = ProposalStatus.SUCCESSFUL; // Atualiza o status da proposta
    proposal.updatedAt = new Date();

    // Lógica para creditar o lucro ao usuário
    user.balance += proposal.profit; // Supondo que user tenha um campo balance
    await this.userRepository.save(user);

    return await this.proposalRepository.save(proposal);
  }

  async update(
    id: number,
    updateProposalDto: UpdateProposalDto,
    user: User,
  ): Promise<Proposal> {
    const proposal = await this.findOne(id, user);
    Object.assign(proposal, updateProposalDto);
    proposal.updatedAt = new Date();
    return await this.proposalRepository.save(proposal);
  }

  async remove(id: number, user: User): Promise<void> {
    const proposal = await this.findOne(id, user);
    await this.proposalRepository.remove(proposal);
  }

  async getProfitByStatus(): Promise<any> {
    return await this.proposalRepository
      .createQueryBuilder('proposal')
      .select('userCreator.id', 'userId')
      .addSelect('SUM(profit)', 'totalProfit')
      .groupBy('userCreator.id')
      .getRawMany();
  }

  async getBestUsers(startDate: Date, endDate: Date): Promise<any> {
    return await this.proposalRepository
      .createQueryBuilder('proposal')
      .select('userCreator.id', 'userId')
      .addSelect('SUM(profit)', 'totalProfit')
      .where('proposal.status = :status', { status: ProposalStatus.SUCCESSFUL })
      .andWhere('proposal.createdAt BETWEEN :start AND :end', {
        start: startDate,
        end: endDate,
      })
      .groupBy('userCreator.id')
      .orderBy('totalProfit', 'DESC')
      .getRawMany();
  }
}
