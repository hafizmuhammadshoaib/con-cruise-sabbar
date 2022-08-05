import { Command, CommandRunner } from 'nest-commander';
import { DriverService } from '../user/services';

@Command({ name: 'cruiser', description: 'Show existing list of cruisers' })
export class CruiserCommand extends CommandRunner {
  constructor(private readonly driverService: DriverService) {
    super();
  }

  async run(): Promise<void> {
    const customer = await this.driverService.findAllDriver();
    console.log(JSON.stringify(customer, null, 3));
  }
}
