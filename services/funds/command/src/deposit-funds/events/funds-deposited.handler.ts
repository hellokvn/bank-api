import { FundsEventProducer } from '@app/common/producer/funds-event.producer';
import { FundsDepositedEvent } from '@bank/sdk';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(FundsDepositedEvent)
export class FundsDepositedHandler implements IEventHandler<FundsDepositedEvent> {
  @Inject(FundsEventProducer)
  private readonly eventProducer: FundsEventProducer;

  public handle(event: FundsDepositedEvent): void {
    console.log('FundsDepositedHandler', { event });
    const { constructor }: FundsDepositedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
