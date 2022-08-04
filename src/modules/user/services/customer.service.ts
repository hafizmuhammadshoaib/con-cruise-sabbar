import { Injectable } from '@nestjs/common';
import { Customer } from '../entities';
import {
  CreateCustomerParams,
  DeleteCustomerParams,
  UpdateCustomerParams,
} from '../interfaces';
import { CustomerRepository } from '../repositories';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepo: CustomerRepository) {}

  public async createCustomer(params: CreateCustomerParams) {
    const {
      currentLocation: { lat, lng },
      name,
      numberOfRides,
      rating,
    } = params;

    await this.customerRepo.insert({
      name,
      locationLatitude: lat,
      locationLongitude: lng,
      numberOfRides,
      rating,
    });
  }

  public async updateCustomer(params: UpdateCustomerParams) {
    const {
      id,
      currentLocation: { lat, lng },
      name,
      numberOfRides,
      rating,
    } = params;
    await this.customerRepo.update(
      {
        id,
      },
      {
        name,
        locationLatitude: lat,
        locationLongitude: lng,
        numberOfRides,
        rating,
      },
    );
  }

  public async deleteCustomers(params: DeleteCustomerParams) {
    const { customerIds } = params;
    await this.customerRepo.deleteCustomerByIds(customerIds);
  }

  public findAllCustomer(): Promise<Customer[]> {
    return this.customerRepo.find({});
  }
}
