import { AccountEventProducer } from '@app/common/producer/account-event.producer';
import { AccountClosedEvent, ACCOUNT_CLOSED_EVENT_NAME } from '@bank/sdk';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AccountClosedEvent)
export class AccountClosedHandler implements IEventHandler<AccountClosedEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public async handle(event: AccountClosedEvent) {
    console.log('AccountClosedHandler/handle', { event });
    this.eventProducer.produce(ACCOUNT_CLOSED_EVENT_NAME, event);
  }
}
