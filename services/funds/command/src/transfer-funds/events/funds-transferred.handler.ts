import { FundsEventProducer } from '@app/common/producer/funds-event.producer';
import { FundsTransferredEvent } from '@bank/sdk';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(FundsTransferredEvent)
export class FundsTransferredHandler implements IEventHandler<FundsTransferredEvent> {
  // todo check if AccountEventProducer shouldnt be FundsEventProducer
  @Inject(FundsEventProducer)
  private readonly eventProducer: FundsEventProducer;

  public handle(event: FundsTransferredEvent): void {
    console.log('FundsTransferredHandler', { event });
    const { constructor }: FundsTransferredEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
