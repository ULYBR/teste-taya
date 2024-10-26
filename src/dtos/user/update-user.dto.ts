import { IsOptional, IsString, IsDecimal } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDecimal()
  balance?: number;
}
