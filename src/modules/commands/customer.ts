import { Command, CommandRunner } from 'nest-commander';
import { CustomerService } from '../user/services';

@Command({ name: 'customer', description: 'Show existing list of customers' })
export class CustomerCommand extends CommandRunner {
  constructor(private readonly customerService: CustomerService) {
    super();
  }

  async run(): Promise<void> {
    const customer = await this.customerService.findAllCustomer();
    console.log(JSON.stringify(customer, null, 3));
  }
}
