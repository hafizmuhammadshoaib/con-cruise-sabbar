import { Injectable } from '@nestjs/common';
import { Customer } from '../entities';
import { DriverRepository } from '../repositories';

@Injectable()
export class DriverService {
  constructor(private readonly driverRepo: DriverRepository) {}

  public findAllDriver(): Promise<Customer[]> {
    return this.driverRepo.find({});
  }
}
