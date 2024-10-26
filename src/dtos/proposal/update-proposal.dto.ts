import { IsDecimal, IsEnum, IsOptional } from 'class-validator';
import { ProposalStatus } from './../../entities/entities.entity';

export class UpdateProposalDto {
  @IsOptional()
  @IsDecimal()
  profit?: number;

  @IsOptional()
  @IsEnum(ProposalStatus)
  status?: ProposalStatus;
}
