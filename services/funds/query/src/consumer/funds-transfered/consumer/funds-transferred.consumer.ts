import { FundsTransferredEvent } from '@bank/sdk';
import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class FundsTransferredConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsTransferredEvent')
  private fundsTransferred(@Payload() payload: KafkaMessage): void {
    const event: FundsTransferredEvent = plainToClass(FundsTransferredEvent, payload);
    console.log('on FundsTransferredEvent', { event });

    this.eventBus.publish(event);
  }
}
