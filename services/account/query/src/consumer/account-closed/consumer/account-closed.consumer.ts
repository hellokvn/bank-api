import { AccountClosedEvent } from '@bank/sdk';
import { Controller, Inject, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class AccountConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
  @Inject('KAFKA_SERVICE')
  private readonly client: ClientKafka;

  @Inject(EventBus)
  private readonly eventBus: EventBus;

  public onApplicationBootstrap() {
    this.client.subscribeToResponseOf('AccountClosedEvent');
  }

  public onApplicationShutdown() {
    this.client.close();
  }

  @MessagePattern('AccountClosedEvent')
  private consume(@Payload() payload: KafkaMessage): void {
    const event: AccountClosedEvent = plainToClass(AccountClosedEvent, payload);

    this.eventBus.publish(event);
  }
}
