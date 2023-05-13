import { Funds } from '@app/common/entity/funds.entity';
import { KAFKA_SERVICE_NAME } from '@bank/sdk/dist/constants';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundsWithdrawnConsumer } from './consumer/funds-withdrawn.consumer';
import { FundsWithdrawnHandler } from './event/funds-withdrawn.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{ name: KAFKA_SERVICE_NAME, transport: Transport.KAFKA }]),
    TypeOrmModule.forFeature([Funds]),
  ],
  controllers: [FundsWithdrawnConsumer],
  providers: [FundsWithdrawnHandler],
})
export class FundsWithdrawnModule {}
