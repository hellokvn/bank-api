import { AccountAggregate } from '@app/common/aggregates/account.aggregate';
import { AccountOpenedEvent, OpenAccountCommand } from '@bank/sdk';

export class OpenAccountAggregate extends AccountAggregate {
  public openAccount(command: OpenAccountCommand): void {
    console.log('AccountAggregate/openAccount');
    const event: AccountOpenedEvent = new AccountOpenedEvent(command);
    // logic
    this.apply(event);
  }

  public onAccountOpenedEvent(event: AccountOpenedEvent): void {
    console.log('AccountAggregate/onAccountOpenedEvent');
    this.id = event.id;
    this.setActive(true);
    this.setBalance(event.openingBalance);
  }
}
