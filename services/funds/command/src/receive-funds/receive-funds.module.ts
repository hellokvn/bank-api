import { FundsEventProducer } from '@app/common/producer/funds-event.producer';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { RceiveFundsHandler } from './commands/receive-funds.handler';
import { FundsReceivedHandler } from './events/funds-received.handler';

@Module({
  imports: [CqrsModule],
  providers: [RceiveFundsHandler, FundsReceivedHandler, FundsEventProducer, EventSourcingHandler],
})
export class ReceiveFundsModule {}
