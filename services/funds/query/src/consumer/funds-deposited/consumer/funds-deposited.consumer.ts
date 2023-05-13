import { FundsDepositedEvent } from '@bank/sdk';
import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class FundsDepositedConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsDepositedEvent')
  private fundsDeposited(@Payload() payload: KafkaMessage): void {
    const event: FundsDepositedEvent = plainToClass(FundsDepositedEvent, payload);
    console.log('on FundsDepositedEvent', { event });

    this.eventBus.publish(event);
  }
}
