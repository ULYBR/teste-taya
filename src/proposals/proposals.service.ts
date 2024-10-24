import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal, ProposalStatus, User } from '../entities/entities.entity';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private proposalRepository: Repository<Proposal>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByIdAndUser(
    proposalId: number,
    userId: number,
  ): Promise<Proposal> {
    return this.proposalRepository.findOne({
      where: { id: proposalId, userCreator: { id: userId } },
    });
  }

  async findPendingProposalsByUser(userId: number): Promise<Proposal[]> {
    return this.proposalRepository.find({
      where: { userCreator: { id: userId }, status: ProposalStatus.PENDING },
    });
  }

  async findRefusedProposalsByUser(userId: number): Promise<Proposal[]> {
    return this.proposalRepository.find({
      where: { userCreator: { id: userId }, status: ProposalStatus.REFUSED },
    });
  }

  async approveProposal(proposalId: number, userId: number): Promise<Proposal> {
    const proposal = await this.findOneByIdAndUser(proposalId, userId);
    if (!proposal || proposal.status !== ProposalStatus.PENDING) {
      throw new Error('Proposal not found or cannot be approved');
    }

    proposal.status = ProposalStatus.SUCCESSFUL;
    await this.userRepository.increment(
      { id: userId },
      'balance',
      proposal.profit,
    );
    return this.proposalRepository.save(proposal);
  }
}
