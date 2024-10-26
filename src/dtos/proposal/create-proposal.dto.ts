import { IsDecimal, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ProposalStatus } from './../../entities/entities.entity';

export class CreateProposalDto {
  @IsNotEmpty()
  customerId: number;

  @IsDecimal()
  profit: number;

  @IsOptional()
  @IsEnum(ProposalStatus)
  status?: ProposalStatus;
}
