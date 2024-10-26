import { IsOptional, IsDecimal } from 'class-validator';

export class UpdateProposalDto {
  @IsOptional()
  @IsDecimal()
  profit?: number;

  @IsOptional()
  status?: string;
}
