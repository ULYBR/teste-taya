import { IsNotEmpty, IsDecimal } from 'class-validator';

export class CreateProposalDto {
  @IsNotEmpty()
  customerId: number;

  @IsNotEmpty()
  @IsDecimal()
  profit: number;
}
