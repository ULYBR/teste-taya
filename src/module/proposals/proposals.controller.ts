import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Request,
  Query,
} from '@nestjs/common';
import { ProposalService } from './proposals.service';
import { CreateProposalDto } from './../../dtos/proposal/create-proposal.dto';
import { Proposal } from 'src/entities/entities.entity';

@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalsService: ProposalService) {}

  @Post()
  async create(
    @Body() createProposalDto: CreateProposalDto,
    @Request() req,
  ): Promise<Proposal> {
    const user = req.user;
    return this.proposalsService.createProposal(createProposalDto, user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req): Promise<Proposal> {
    return this.proposalsService.findOne(id, req.user);
  }

  @Get()
  async findAll(@Request() req): Promise<Proposal[]> {
    return this.proposalsService.findAll(req.user);
  }

  @Get('refused')
  async findRefused(@Request() req): Promise<Proposal[]> {
    return this.proposalsService.findRefused(req.user);
  }

  @Post(':id/approve')
  async approveProposal(
    @Param('id') id: number,
    @Request() req,
  ): Promise<Proposal> {
    return this.proposalsService.approveProposal(id, req.user);
  }

  // Admin endpoints
  @Get('admin/profit-by-status')
  async getProfitByStatus(): Promise<any> {
    return this.proposalsService.getProfitByStatus();
  }

  @Get('admin/best-users')
  async getBestUsers(
    @Query('start') start: Date,
    @Query('end') end: Date,
  ): Promise<any> {
    return this.proposalsService.getBestUsers(start, end);
  }
}
