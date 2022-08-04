import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Driver } from './driver.entity';

@Entity()
export class CustomerDriverMatched {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'customer_id',
  })
  customerId: number;

  @Column({
    name: 'driver_id',
  })
  driverId: number;

  @Column({
    name: 'is_matched',
  })
  isMatched: boolean;

  @ManyToOne(() => Customer, (customer) => customer.customerDriverMatched)
  @JoinColumn({
    name: 'customer_id',
  })
  customer: Customer;

  @ManyToOne(() => Driver, (driver) => driver.customerDriverMatched)
  @JoinColumn({
    name: 'driver_id',
  })
  driver: Driver;
}
