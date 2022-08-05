import { Munkres } from 'munkres-js';
import { Command, CommandRunner } from 'nest-commander';
import { Customer, Driver } from '../user/entities';
import { CustomerService, DriverService } from '../user/services';
import { ScoreService } from '../user/services/score.service';

@Command({
  name: 'match',
  description: 'Show each customer and assigned driver',
})
export class MatchCommand extends CommandRunner {
  constructor(
    private readonly customerService: CustomerService,
    private readonly driverService: DriverService,
    private readonly scoreService: ScoreService,
  ) {
    super();
  }

  async run(): Promise<void> {
    const customers = await this.customerService.findAllCustomer();
    const drivers = await this.driverService.findAllDriver();
    const matrix = [];
    for (const customer of customers) {
      const customerDriverRelationScores = [];
      for (const driver of drivers) {
        const score = this.scoreService.calculateScore(customer, driver);
        customerDriverRelationScores.push(score);
      }
      matrix.push(customerDriverRelationScores);
    }

    const m = new Munkres();
    const matchedPairs: number[][] = m.compute(matrix);

    const unMatchedCustomers = this.getUnMatchedCustomers(
      customers,
      matchedPairs,
    );
    const idleDrivers = this.getIdleDrivers(drivers, matchedPairs);
    matchedPairs.forEach(([customerIndex, driverIndex]) => {
      console.log(
        `customer with id ${customers[customerIndex].id}  is assigned to driver with id ${drivers[driverIndex].id} `,
      );
    });

    console.log('Failed Fulfillment Customers');
    if (unMatchedCustomers.length === 0) {
      console.log(' All customers are assigned ');
    } else {
      unMatchedCustomers.forEach((c) => console.log(`${c.id} - ${c.name}`));
    }

    console.log('Idle Drivers');
    if (idleDrivers.length === 0) {
      console.log('All drivers are busy now');
    } else {
      idleDrivers.forEach((d) => console.log(`${d.id} - ${d.name}`));
    }
  }

  private getUnMatchedCustomers(customers: Customer[], pairs: number[][]) {
    const matchedCustomers = pairs.map(([customer]) => customer);

    const unMatchedCustomers = customers.filter(
      (_, index) => matchedCustomers.indexOf(index) < 0,
    );

    return unMatchedCustomers;
  }

  private getIdleDrivers(drivers: Driver[], pairs: number[][]) {
    const assignedDrivers = pairs.map(([, driver]) => driver);
    const idleDrivers = drivers.filter(
      (_, index) => assignedDrivers.indexOf(index) < 0,
    );

    return idleDrivers;
  }
}
