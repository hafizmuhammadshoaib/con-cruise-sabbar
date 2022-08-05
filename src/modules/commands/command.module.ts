import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CruiserCommand } from './cruiser';
import { CustomerCommand } from './customer';
import { MatchCommand } from './match';

@Module({
  imports: [UserModule],
  providers: [CruiserCommand, CustomerCommand, MatchCommand],
})
export class CommandModule {}
