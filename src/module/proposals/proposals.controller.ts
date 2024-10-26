import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
} from '@nestjs/common';
import { ProposalService } from './proposals.service';
import { CreateProposalDto } from './../../dtos/proposal/create-proposal.dto';
import { UpdateProposalDto } from './../../dtos/proposal/update-proposal.dto';
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
    return this.proposalsService.createProposal({ createProposalDto, user });
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req): Promise<Proposal> {
    return this.proposalsService.findOne(id, req.user);
  }

  @Get()
  async findAll(@Request() req): Promise<Proposal[]> {
    return this.proposalsService.findAll(req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProposalDto: UpdateProposalDto,
    @Request() req,
  ): Promise<Proposal> {
    return this.proposalsService.update(id, updateProposalDto, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req): Promise<void> {
    return this.proposalsService.remove(id, req.user);
  }
}
