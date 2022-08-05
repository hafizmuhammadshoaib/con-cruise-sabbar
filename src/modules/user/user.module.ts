import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository, DriverRepository } from './repositories';
import { CustomerController } from './controllers';
import { CustomerService, DriverService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository, DriverRepository])],
  controllers: [CustomerController],
  providers: [CustomerService, DriverService],
  exports: [CustomerService, DriverService],
})
export class UserModule {}
