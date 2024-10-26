import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from './../../entities/entities.entity';
import { CreateProposalDto } from './../../dtos/proposal/create-proposal.dto';
import { UpdateProposalDto } from './../../dtos/proposal/update-proposal.dto';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
  ) {}

  async createProposal({
    createProposalDto,
    user,
  }: {
    createProposalDto: CreateProposalDto;
    user;
  }): Promise<Proposal> {
    const proposal = this.proposalRepository.create({
      ...createProposalDto,
      userCreator: user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.proposalRepository.save(proposal);
  }

  async findOne(id: number, user): Promise<Proposal> {
    const proposal = await this.proposalRepository.findOne({
      where: { id, userCreator: user },
    });
    if (!proposal) {
      throw new Error('Proposal not found or does not belong to the user');
    }
    return proposal;
  }

  async findAll(user): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      where: { userCreator: user, status: Proposal.status.PENDING },
    });
  }

  async update(
    id: number,
    updateProposalDto: UpdateProposalDto,
    user,
  ): Promise<Proposal> {
    const proposal = await this.findOne(id, user);
    Object.assign(proposal, updateProposalDto);
    proposal.updatedAt = new Date();
    return await this.proposalRepository.save(proposal);
  }

  async remove(id: number, user): Promise<void> {
    const proposal = await this.findOne(id, user);
    await this.proposalRepository.remove(proposal);
  }
}
