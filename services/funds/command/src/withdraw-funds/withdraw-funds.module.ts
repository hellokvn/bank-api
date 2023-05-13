import { ACCOUNT_QUERY_PROVIDER } from '@app/common/options/grpc-client.option';
import { FundsEventProducer } from '@app/common/producer/funds-event.producer';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { WithdrawFundsHandler } from './commands/withdraw-funds.handler';
import { WithdrawFundsController } from './controllers/withdraw-funds.controller';
import { FundsWithdrawnHandler } from './events/funds-withdrawn.handler';

@Module({
  imports: [CqrsModule, ClientsModule.registerAsync([ACCOUNT_QUERY_PROVIDER])],
  controllers: [WithdrawFundsController],
  providers: [WithdrawFundsHandler, FundsWithdrawnHandler, FundsEventProducer, EventSourcingHandler],
})
export class WithdrawFundsModule {}
