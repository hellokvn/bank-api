import { FUNDS_COMMAND_PACKAGE_NAME, FUNDS_QUERY_SERVICE_NAME } from '@bank/sdk';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { AccountEventProducer } from '../common/producer/account-event.producer';
import { OpenAccountHandler } from './commands/open-account.handler';
import { OpenAccountController } from './controllers/open-account.controller';
import { AccountOpenedHandler } from './events/account-opened.handler';
import { OpenAccountSaga } from './sagas/open-account.saga';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        name: FUNDS_QUERY_SERVICE_NAME,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get('FUNDS_COMMAND_GRPC_URL'),
            package: FUNDS_COMMAND_PACKAGE_NAME,
            protoPath: 'node_modules/@bank/sdk/dist/proto/funds-command.proto',
          },
        }),
      },
    ]),
  ],
  controllers: [OpenAccountController],
  providers: [OpenAccountHandler, AccountOpenedHandler, AccountEventProducer, EventSourcingHandler, OpenAccountSaga],
})
export class OpenAccountModule {}
