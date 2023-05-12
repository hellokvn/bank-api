import { Account } from '@app/common/entity/account.entity';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindAccountController } from './controller/find-account.controller';
import { FindAccountQueryHandler } from './query/find-account.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Account])],
  controllers: [FindAccountController],
  providers: [FindAccountQueryHandler],
})
export class FindAccountModule {}
