import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { AccountEventProducer } from '../common/producer/account-event.producer';
import { CloseAccountHandler } from './commands/close-account.handler';
import { CloseAccountController } from './controllers/close-account.controller';
import { AccountClosedHandler } from './events/account-closed.handler';

@Module({
  imports: [CqrsModule],
  controllers: [CloseAccountController],
  providers: [CloseAccountHandler, AccountClosedHandler, AccountEventProducer, EventSourcingHandler],
})
export class CloseAccountModule {}
