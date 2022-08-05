import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository, DriverRepository } from './repositories';
import { CustomerController } from './controllers';
import { CustomerService, DriverService } from './services';
import { ScoreService } from './services/score.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository, DriverRepository])],
  controllers: [CustomerController],
  providers: [CustomerService, DriverService, ScoreService],
  exports: [CustomerService, DriverService, ScoreService],
})
export class UserModule {}
