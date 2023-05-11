import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { FundsModule } from './funds/funds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.IS_DOCKER ? '.docker.env' : '.env',
    }),
    AccountModule,
    FundsModule,
  ],
})
export class AppModule {}
