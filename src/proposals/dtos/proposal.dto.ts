import { IsDecimal, IsEnum, IsNotEmpty } from 'class-validator';
import { ProposalStatus } from '../../entities/entities.entity';

export class CreateProposalDto {
  @IsDecimal()
  @IsNotEmpty()
  profit: number;

  @IsEnum(ProposalStatus)
  status: ProposalStatus;
}

export class UpdateProposalDto {
  @IsEnum(ProposalStatus)
  status: ProposalStatus;
}
