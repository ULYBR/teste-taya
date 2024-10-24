import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProposalDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  value?: number;
}
