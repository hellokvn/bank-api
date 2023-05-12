import { AccountEventProducer } from '@app/common/producer/account-event.producer';
import { AccountOpenedEvent } from '@bank/sdk';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedHandler implements IEventHandler<AccountOpenedEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: AccountOpenedEvent): void {
    console.log('AccountOpenedHandler/handle');
    const { constructor }: AccountOpenedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
