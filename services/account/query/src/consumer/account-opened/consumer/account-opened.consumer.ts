import { AccountOpenedEvent } from '@bank/sdk';
import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class AccountOpenedConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('AccountOpenedEvent')
  private consume(@Payload() payload: KafkaMessage): void {
    console.log('AccountOpenedConsumer/consume', { payload });
    const event: AccountOpenedEvent = plainToClass(AccountOpenedEvent, payload);

    this.eventBus.publish(event);
  }
}
