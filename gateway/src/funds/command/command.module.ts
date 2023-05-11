import { FUNDS_COMMAND_PACKAGE_NAME, FUNDS_COMMAND_SERVICE_NAME } from '@bank/sdk';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommandController } from './command.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: FUNDS_COMMAND_SERVICE_NAME,
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
  controllers: [CommandController],
})
export class CommandModule {}
