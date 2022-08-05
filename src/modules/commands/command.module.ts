import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { BasicCommand } from './basic';
import { CruiserCommand } from './cruiser';
import { CustomerCommand } from './customer';

@Module({
  imports: [UserModule],
  providers: [CruiserCommand, CustomerCommand, BasicCommand],
})
export class CommandModule {}
