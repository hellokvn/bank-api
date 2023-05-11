import { ACCOUNT_COMMAND_PACKAGE_NAME, ACCOUNT_COMMAND_SERVICE_NAME } from '@bank/sdk';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommandController } from './command.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ACCOUNT_COMMAND_SERVICE_NAME,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get('ACCOUNT_COMMAND_GRPC_URL'),
            package: ACCOUNT_COMMAND_PACKAGE_NAME,
            protoPath: 'node_modules/@bank/sdk/dist/proto/account-command.proto',
          },
        }),
      },
    ]),
  ],
  controllers: [CommandController],
})
export class CommandModule {}
