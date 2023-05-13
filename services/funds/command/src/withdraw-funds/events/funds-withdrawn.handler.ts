import { FundsEventProducer } from '@app/common/producer/funds-event.producer';
import { FundsWithdrawnEvent } from '@bank/sdk';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(FundsWithdrawnEvent)
export class FundsWithdrawnHandler implements IEventHandler<FundsWithdrawnEvent> {
  @Inject(FundsEventProducer)
  private readonly eventProducer: FundsEventProducer;

  public handle(event: FundsWithdrawnEvent): void {
    console.log('FundsWithdrawedHandler/handle', { event });
    const { constructor }: FundsWithdrawnEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
