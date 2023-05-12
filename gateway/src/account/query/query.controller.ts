import {
  AccountQueryServiceClient,
  ACCOUNT_QUERY_SERVICE_NAME,
  FindAccountRequest,
  FindAccountResponse,
  FindAllAccountsRequest,
  FindAllAccountsResponse,
} from '@bank/sdk';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('account/query')
export class QueryController implements OnModuleInit {
  @Inject(ACCOUNT_QUERY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private service: AccountQueryServiceClient;

  public onModuleInit(): void {
    this.service = this.client.getService<AccountQueryServiceClient>(ACCOUNT_QUERY_SERVICE_NAME);
  }

  @Post('find-one')
  private findAccount(@Body() payload: FindAccountRequest): Observable<FindAccountResponse> {
    return this.service.findAccount(payload);
  }

  @Post('find')
  private findAllAccounts(@Body() payload: FindAllAccountsRequest): Observable<FindAllAccountsResponse> {
    return this.service.findAllAccounts(payload);
  }
}
