import { Account } from '@app/common/entity/account.entity';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindAllAccountsController } from './controller/find-all-accounts.controller';
import { FindAllAccountsQueryHandler } from './query/find-all-accounts.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Account])],
  controllers: [FindAllAccountsController],
  providers: [FindAllAccountsQueryHandler],
})
export class FindAllAccountsModule {}
