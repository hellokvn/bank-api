import { Account } from '@app/common/entity/account.entity';
import { KAFKA_SERVICE_NAME } from '@bank/sdk';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOpenedConsumer } from './consumer/account-opened.consumer';
import { AccountOpenedHandler } from './event/account-opened.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{ name: KAFKA_SERVICE_NAME, transport: Transport.KAFKA }]),
    TypeOrmModule.forFeature([Account]),
  ],
  controllers: [AccountOpenedConsumer],
  providers: [AccountOpenedHandler],
})
export class AccountOpenedModule {}
