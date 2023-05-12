import { Account } from '@app/common/entity/account.entity';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountConsumer } from './consumer/account-closed.consumer';
import { AccountClosedHandler } from './event/account-closed.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{ name: 'KAFKA_SERVICE', transport: Transport.KAFKA }]),
    TypeOrmModule.forFeature([Account]),
  ],
  controllers: [AccountConsumer],
  providers: [AccountClosedHandler],
})
export class AccountClosedModule {}
