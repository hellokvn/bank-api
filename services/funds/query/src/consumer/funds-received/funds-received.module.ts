import { Funds } from '@app/common/entity/funds.entity';
import { KAFKA_SERVICE_NAME } from '@bank/sdk';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundsReceivedConsumer } from './consumer/funds-received.consumer';
import { FundsReceivedHandler } from './event/funds-received.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{ name: KAFKA_SERVICE_NAME, transport: Transport.KAFKA }]),
    TypeOrmModule.forFeature([Funds]),
  ],
  controllers: [FundsReceivedConsumer],
  providers: [FundsReceivedHandler],
})
export class FundsReceivedModule {}
