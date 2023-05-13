import { FundsReceivedEvent } from '@bank/sdk';
import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class FundsReceivedConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsReceivedEvent')
  private fundsReceived(@Payload() payload: KafkaMessage): void {
    const event: FundsReceivedEvent = plainToClass(FundsReceivedEvent, payload);

    this.eventBus.publish(event);
  }
}
