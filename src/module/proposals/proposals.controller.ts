// src/controllers/proposal.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ProposalService } from './proposals.service';
import { CreateProposalDto } from './../../dtos/proposal/create-proposal.dto';
import { UpdateProposalDto } from './../../dtos/proposal/update-proposal.dto';
import { ProposalStatus } from 'src/entities/entities.entity';

@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post()
  async createProposal(
    @Body() createProposalDto: CreateProposalDto,
    @Req() req,
  ) {
    const user = req.user;
    return await this.proposalService.createProposal(createProposalDto, user);
  }

  @Get(':id')
  async getProposal(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const user = req.user;
    return await this.proposalService.findOne(id, user);
  }

  @Get()
  async getProposalsByStatus(
    @Query('status') status: ProposalStatus,
    @Req() req,
  ) {
    const user = req.user;
    return await this.proposalService.findAllByStatus(user, status);
  }

  @Post(':proposal_id/approve')
  async approveProposal(
    @Param('proposal_id', ParseIntPipe) proposalId: number,
    @Req() req,
  ) {
    const user = req.user;
    return await this.proposalService.approveProposal(proposalId, user);
  }

  @Patch(':id')
  async updateProposal(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProposalDto: UpdateProposalDto,
    @Req() req,
  ) {
    const user = req.user;
    return await this.proposalService.update(id, updateProposalDto, user);
  }

  @Delete(':id')
  async deleteProposal(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const user = req.user;
    return await this.proposalService.remove(id, user);
  }

  @Get('/admin/profit-by-status')
  async getProfitByStatus() {
    const profile = await this.proposalService.getProfitByStatus();
    return { profile };
  }
}
