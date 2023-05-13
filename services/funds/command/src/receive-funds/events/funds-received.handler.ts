import { FundsEventProducer } from '@app/common/producer/funds-event.producer';
import { FundsReceivedEvent } from '@bank/sdk';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(FundsReceivedEvent)
export class FundsReceivedHandler implements IEventHandler<FundsReceivedEvent> {
  @Inject(FundsEventProducer)
  private readonly eventProducer: FundsEventProducer;

  public handle(event: FundsReceivedEvent): void {
    console.log('FundsReceivedEvent', { event });
    const { constructor }: FundsReceivedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
