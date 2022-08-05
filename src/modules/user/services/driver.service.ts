import { Injectable } from '@nestjs/common';
import { Driver } from '../entities';
import { DriverRepository } from '../repositories';

@Injectable()
export class DriverService {
  constructor(private readonly driverRepo: DriverRepository) {}

  public findAllDriver(): Promise<Driver[]> {
    return this.driverRepo.find({});
  }
}
