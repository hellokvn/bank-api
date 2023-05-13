import { Funds } from '@app/common/entity/funds.entity';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetBalanceController } from './controller/get-balance.controller';
import { GetBalanceQueryHandler } from './query/get-balance.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Funds])],
  controllers: [GetBalanceController],
  providers: [GetBalanceQueryHandler],
})
export class GetBalanceModule {}
