import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CustomerDriverMatched } from './customer-driver-matched.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'location_latitude',
    type: 'float8',
  })
  locationLatitude: number;

  @Column({
    name: 'location_longitude',
    type: 'float8',
  })
  locationLongitude: number;

  @Column({
    name: 'number_of_rides',
  })
  numberOfRides: number;

  @Column({
    name: 'rating',
    type: 'float4',
  })
  rating: number;

  @OneToMany(
    () => CustomerDriverMatched,
    (customerDriverMatched) => customerDriverMatched.customer,
  )
  @JoinColumn({
    name: 'id',
  })
  customerDriverMatched: CustomerDriverMatched;
}
