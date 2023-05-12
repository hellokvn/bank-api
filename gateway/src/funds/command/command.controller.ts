import {
  DepositFundsRequest,
  DepositFundsResponse,
  FundsCommandServiceClient,
  FUNDS_COMMAND_SERVICE_NAME,
  TransferFundsRequest,
  TransferFundsResponse,
  WithdrawFundsRequest,
  WithdrawFundsResponse,
} from '@bank/sdk';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('funds/command')
export class CommandController implements OnModuleInit {
  @Inject(FUNDS_COMMAND_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private service: FundsCommandServiceClient;

  public onModuleInit(): void {
    this.service = this.client.getService<FundsCommandServiceClient>(FUNDS_COMMAND_SERVICE_NAME);
  }

  @Post('deposit')
  private depositFunds(@Body() payload: DepositFundsRequest): Observable<DepositFundsResponse> {
    return this.service.depositFunds(payload);
  }

  @Post('withdraw')
  private withdrawFunds(@Body() payload: WithdrawFundsRequest): Observable<WithdrawFundsResponse> {
    return this.service.withdrawFunds(payload);
  }

  @Post('transfer')
  private transferFunds(@Body() payload: TransferFundsRequest): Observable<TransferFundsResponse> {
    return this.service.transferFunds(payload);
  }
}
