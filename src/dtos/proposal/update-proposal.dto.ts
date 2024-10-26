import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ProposalStatus } from './../../entities/entities.entity';

export class UpdateProposalDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsOptional()
  profit?: number;

  @IsEnum(ProposalStatus)
  @IsOptional()
  status?: ProposalStatus;
}
