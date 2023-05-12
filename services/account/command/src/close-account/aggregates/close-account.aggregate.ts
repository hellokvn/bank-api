import { AccountAggregate } from '@app/common/aggregates/account.aggregate';
import { AccountClosedEvent, CloseAccountCommand } from '@bank/sdk';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CloseAccountAggregate extends AccountAggregate {
  public closeAccount(command: CloseAccountCommand): void | never {
    if (!this.getActive()) {
      throw new HttpException('This account is already closed!', HttpStatus.BAD_REQUEST);
    }

    const event: AccountClosedEvent = new AccountClosedEvent(command);
    // logic
    this.apply(event);
  }

  public onAccountClosedEvent(event: AccountClosedEvent): void {
    console.log('AccountAggregate/onAccountClosedEvent');
    this.id = event.id;
    this.setActive(false);
  }
}
