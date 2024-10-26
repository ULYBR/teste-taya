import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProposalStatus } from 'src/entities/entities.entity';
export class CreateProposalDto {
  @IsNumber()
  @IsNotEmpty()
  profit: number;
  @IsString()
  @IsNotEmpty()
  status: ProposalStatus;
}
