import { ACCOUNT_QUERY_PACKAGE_NAME, ACCOUNT_QUERY_SERVICE_NAME } from '@bank/sdk';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueryController } from './query.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ACCOUNT_QUERY_SERVICE_NAME,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get('ACCOUNT_QUERY_GRPC_URL'),
            package: ACCOUNT_QUERY_PACKAGE_NAME,
            protoPath: 'node_modules/@bank/sdk/dist/proto/account-query.proto',
          },
        }),
      },
    ]),
  ],
  controllers: [QueryController],
})
export class QueryModule {}
