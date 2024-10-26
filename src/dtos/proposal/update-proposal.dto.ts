import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { ProposalStatus } from './../../entities/entities.entity';

export class UpdateProposalDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  profit?: number;

  @IsEnum(ProposalStatus)
  @IsOptional()
  status?: ProposalStatus;
}
