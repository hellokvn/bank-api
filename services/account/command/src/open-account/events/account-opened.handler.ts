import { AccountEventProducer } from '@app/common/producer/account-event.producer';
import { AccountOpenedEvent, ACCOUNT_OPENED_EVENT_NAME } from '@bank/sdk';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedHandler implements IEventHandler<AccountOpenedEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: AccountOpenedEvent): void {
    console.log('AccountOpenedHandler/handle');
    this.eventProducer.produce(ACCOUNT_OPENED_EVENT_NAME, event);
  }
}
