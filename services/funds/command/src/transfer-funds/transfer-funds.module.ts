import { ACCOUNT_QUERY_PROVIDER } from '@app/common/options/grpc-client.option';
import { FundsEventProducer } from '@app/common/producer/funds-event.producer';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { TransferFundsHandler } from './commands/transfer-funds.handler';
import { TransferFundsController } from './controllers/transfer-funds.controller';
import { FundsTransferredHandler } from './events/funds-transferred.handler';
import { TransferFundsSaga } from './sagas/transfer-funds.saga';

@Module({
  imports: [CqrsModule, ClientsModule.registerAsync([ACCOUNT_QUERY_PROVIDER])],
  controllers: [TransferFundsController],
  providers: [
    TransferFundsHandler,
    FundsTransferredHandler,
    FundsEventProducer,
    EventSourcingHandler,
    TransferFundsSaga,
  ],
})
export class TransferFundsModule {}
