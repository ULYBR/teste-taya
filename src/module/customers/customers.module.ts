import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { dataSourceOptions } from './../../configs/ormconfig';
import { CustomersController } from './customers.controller';
import { Customer } from 'src/entities/entities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Customer]),
  ],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
