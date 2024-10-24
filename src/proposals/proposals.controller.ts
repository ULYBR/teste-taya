import { Controller, Get, Param, Req, Post } from '@nestjs/common';
import { ProposalService } from './proposals.service';
import { Proposal } from '../entities/entities.entity';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get(':id')
  async getProposalById(
    @Param('id') proposalId: number,
    @Req() req: { user: { id: number } },
  ): Promise<Proposal> {
    return this.proposalService.findOneByIdAndUser(proposalId, req.user.id);
  }

  @Get()
  async getPendingProposals(
    @Req() req: { user: { id: number } },
  ): Promise<Proposal[]> {
    return this.proposalService.findPendingProposalsByUser(req.user.id);
  }

  @Get('refused')
  async getRefusedProposals(
    @Req() req: { user: { id: number } },
  ): Promise<Proposal[]> {
    return this.proposalService.findRefusedProposalsByUser(req.user.id);
  }

  @Post(':proposal_id/approve')
  async approveProposal(
    @Param('proposal_id') proposalId: number,
    @Req() req: { user: { id: number } },
  ): Promise<Proposal> {
    return this.proposalService.approveProposal(proposalId, req.user.id);
  }
}
