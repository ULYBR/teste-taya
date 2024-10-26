import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './../../entities/entities.entity';
import { CreateCustomerDto } from './../../dtos/customer/create-customer.dto';
import { User } from 'src/entities/entities.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
    userCreator: User,
  ): Promise<Customer> {
    const customer = this.customerRepository.create({
      ...createCustomerDto,
      userCreator,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.customerRepository.save(customer);
  }
}
