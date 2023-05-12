import { ACCOUNT_COMMAND_PACKAGE_NAME, HttpExceptionFilter } from '@bank/sdk';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = new Logger();

  await configure(app, config);

  app.listen(null, () => {
    logger.log(`[NOD] ${process.version}`);
    logger.log(`[ENV] ${process.env.NODE_ENV}`);
    logger.log(`[DKR] ${process.env.IS_DOCKER ? true : false}`);
    logger.log(`[KFK] ${config.get('KAFKA_URL')}`);
    logger.log(`[MDB] ${config.get('DB_URL')}`);
    logger.log(`[URL] ${config.get('GRPC_URL')}`);
  });
}

async function configure(app: INestApplication, config: ConfigService): Promise<void> {
  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.connectMicroservice(
    {
      transport: Transport.GRPC,
      options: {
        url: config.get('GRPC_URL'),
        package: ACCOUNT_COMMAND_PACKAGE_NAME,
        protoPath: 'node_modules/@bank/sdk/dist/proto/account-command.proto',
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
}

bootstrap();
