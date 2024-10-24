import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProposalDto {
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
