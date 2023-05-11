import { Version } from '@app/common';
import {
  AccountCommandServiceClient,
  ACCOUNT_COMMAND_SERVICE_NAME,
  CloseAccountRequest,
  CloseAccountResponse,
  OpenAccountRequest,
  OpenAccountResponse,
} from '@bank/sdk';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller({ path: 'account/command', version: Version.One })
export class CommandController implements OnModuleInit {
  @Inject(ACCOUNT_COMMAND_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private service: AccountCommandServiceClient;

  public onModuleInit(): void {
    this.service = this.client.getService<AccountCommandServiceClient>(ACCOUNT_COMMAND_SERVICE_NAME);
  }

  @Post('open')
  private openAccount(@Body() payload: OpenAccountRequest): Observable<OpenAccountResponse> {
    return this.service.openAccount(payload);
  }

  @Post('close')
  private closeAccount(@Body() payload: CloseAccountRequest): Observable<CloseAccountResponse> {
    return this.service.closeAccount(payload);
  }
}
