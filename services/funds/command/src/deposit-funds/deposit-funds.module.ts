import { ACCOUNT_QUERY_PROVIDER } from '@app/common/options/grpc-client.option';
import { FundsEventProducer } from '@app/common/producer/funds-event.producer';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { DepositFundsHandler } from './commands/deposit-funds.handler';
import { DepositFundsController } from './controllers/deposit-funds.controller';
import { FundsDepositedHandler } from './events/funds-deposited.handler';

@Module({
  imports: [CqrsModule, ClientsModule.registerAsync([ACCOUNT_QUERY_PROVIDER])],
  controllers: [DepositFundsController],
  providers: [DepositFundsHandler, FundsDepositedHandler, FundsEventProducer, EventSourcingHandler],
})
export class DepositFundsModule {}
