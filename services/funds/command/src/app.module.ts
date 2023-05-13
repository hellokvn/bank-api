import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventSourcingModule } from 'nestjs-event-sourcing';

import { DepositFundsModule } from './deposit-funds/deposit-funds.module';
import { ReceiveFundsModule } from './receive-funds/receive-funds.module';
import { TransferFundsModule } from './transfer-funds/transfer-funds.module';
import { WithdrawFundsModule } from './withdraw-funds/withdraw-funds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.IS_DOCKER ? '.docker.env' : '.env' }),
    EventSourcingModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        mongoUrl: config.get('DB_URL'),
      }),
    }),
    DepositFundsModule,
    WithdrawFundsModule,
    TransferFundsModule,
    ReceiveFundsModule,
  ],
})
export class AppModule {}
