import { Controller, Post, Body, Request } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './../../dtos/customer/create-customer.dto';
import { Customer } from 'src/entities/entities.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Request() req,
  ): Promise<Customer> {
    const user = req.user;
    return this.customersService.createCustomer(createCustomerDto, user);
  }
}
