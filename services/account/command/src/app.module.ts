import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventSourcingModule } from 'nestjs-event-sourcing';
import { CloseAccountModule } from './close-account/close-account.module';
import { OpenAccountModule } from './open-account/open-account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.IS_DOCKER ? '.docker.env' : '.env',
    }),
    EventSourcingModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        mongoUrl: config.get('DB_URL'),
      }),
    }),
    OpenAccountModule,
    CloseAccountModule,
  ],
})
export class AppModule {}
