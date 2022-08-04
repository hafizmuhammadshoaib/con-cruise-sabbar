import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CustomerDto } from '../dto';
import { CreateCustomerParams, UpdateCustomerParams } from '../interfaces';
import { CustomerService } from '../services';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  async findAll() {
    return await this.customerService.findAllCustomer();
  }

  @Post()
  async create(@Body() body: CustomerDto.CreateCustomer) {
    const createCustomerParams: CreateCustomerParams = {
      ...body,
      name: body.fullName,
    };
    return this.customerService.createCustomer(createCustomerParams);
  }

  @Put()
  async update(@Body() customer: CustomerDto.UpdateCustomer) {
    const updateCustomerParams: UpdateCustomerParams = {
      ...customer,
      name: customer.fullName,
    };
    return this.customerService.updateCustomer(updateCustomerParams);
  }

  @Delete()
  async remove(@Body() customer: CustomerDto.DeleteCustomer) {
    return this.customerService.deleteCustomers({
      customerIds: customer.customerIds,
    });
  }
}
