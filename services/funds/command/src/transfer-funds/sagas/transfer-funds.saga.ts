import { FundsTransferredEvent, ReceiveFundsCommand } from '@bank/sdk';
import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { delay, map, Observable } from 'rxjs';

@Injectable()
export class TransferFundsSaga {
  @Saga()
  private onEvent(events$: Observable<FundsTransferredEvent>): Observable<ICommand> {
    return events$.pipe(
      ofType(FundsTransferredEvent),
      delay(1000),
      map((event: FundsTransferredEvent) => {
        return new ReceiveFundsCommand(event);
      }),
    );
  }
}
