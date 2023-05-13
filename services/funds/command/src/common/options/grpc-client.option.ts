import { ACCOUNT_QUERY_PACKAGE_NAME, ACCOUNT_QUERY_SERVICE_NAME } from '@bank/sdk';
import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';

export const ACCOUNT_QUERY_PROVIDER: ClientsProviderAsyncOptions = {
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
};
