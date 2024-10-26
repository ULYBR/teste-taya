import { IsString, IsNumber } from 'class-validator';

export class ProfitProposalDto {
  @IsNumber()
  id: number;

  @IsString()
  fullName: string;

  @IsNumber()
  profit: number;
}
