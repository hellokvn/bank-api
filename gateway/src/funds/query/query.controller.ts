import { Version } from '@app/common';
import { FundsQueryServiceClient, FUNDS_QUERY_SERVICE_NAME, GetBalanceRequest, GetBalanceResponse } from '@bank/sdk';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller({ path: 'funds/query', version: Version.One })
export class QueryController implements OnModuleInit {
  @Inject(FUNDS_QUERY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private service: FundsQueryServiceClient;

  public onModuleInit(): void {
    this.service = this.client.getService<FundsQueryServiceClient>(FUNDS_QUERY_SERVICE_NAME);
  }

  @Post('balance')
  private getBalance(@Body() payload: GetBalanceRequest): Observable<GetBalanceResponse> {
    return this.service.getBalance(payload);
  }
}
