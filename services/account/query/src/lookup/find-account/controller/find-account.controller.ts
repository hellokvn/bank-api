import { Account } from '@app/common/entity/account.entity';
import { ACCOUNT_QUERY_SERVICE_NAME, FindAccountResponse } from '@bank/sdk';
import { Controller, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { FindAccountQuery } from '../query/find-account.query';
import { FindAccountDto } from './find-account.dto';

@Controller()
export class FindAccountController {
  @Inject(QueryBus)
  private readonly queryBus: QueryBus;

  @GrpcMethod(ACCOUNT_QUERY_SERVICE_NAME, 'FindAccount')
  private async findAccount(@Payload() payload: FindAccountDto): Promise<FindAccountResponse> {
    const query: FindAccountQuery = new FindAccountQuery(payload);
    const data: Account = await this.queryBus.execute(query);

    if (!data) {
      throw new HttpException('No account found!', HttpStatus.NO_CONTENT);
    }

    return { data, status: HttpStatus.OK, error: null };
  }
}
