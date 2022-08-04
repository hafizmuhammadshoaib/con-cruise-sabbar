import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entities';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  public deleteCustomerByIds(customerIds: number[]) {
    return this.createQueryBuilder('customer')
      .delete()
      .where('id IN (:...customerIds)', { customerIds })
      .execute();
  }
}
