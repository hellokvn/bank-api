import {
  AccountOpenedEvent,
  DepositFundsRequest,
  FundsCommandServiceClient,
  FUNDS_COMMAND_SERVICE_NAME,
  FUNDS_QUERY_SERVICE_NAME,
} from '@bank/sdk';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { delay, firstValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class OpenAccountSaga implements OnModuleInit {
  @Inject(FUNDS_QUERY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private fundsCommandService: FundsCommandServiceClient;

  public onModuleInit() {
    this.fundsCommandService = this.client.getService<FundsCommandServiceClient>(FUNDS_COMMAND_SERVICE_NAME);
  }

  @Saga()
  private onEvent(events$: Observable<AccountOpenedEvent>): Observable<ICommand> {
    const apply = map((event: AccountOpenedEvent) => {
      this.onAcountOpenedEvent(event);
      return null;
    });

    return events$.pipe(ofType(AccountOpenedEvent), delay(1000), apply);
  }

  private async onAcountOpenedEvent({ id, openingBalance }: AccountOpenedEvent): Promise<void> {
    // send to funds to deposit by grpc
    console.log('OpenAccountSaga/accountOpened', id);
    const req: DepositFundsRequest = { id, amount: openingBalance };

    await firstValueFrom(this.fundsCommandService.depositFunds(req));
  }
}
