import { EntityRepository, Repository } from 'typeorm';
import { Driver } from '../entities/driver.entity';

@EntityRepository(Driver)
export class DriverRepository extends Repository<Driver> {}
