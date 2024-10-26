import { IsNotEmpty, IsString, IsDecimal } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDecimal()
  balance: number;
}
