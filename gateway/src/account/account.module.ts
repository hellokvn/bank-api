import { Module } from '@nestjs/common';
import { CommandModule } from './command/command.module';
import { QueryModule } from './query/query.module';

@Module({
  imports: [CommandModule, QueryModule],
})
export class AccountModule {}
