import { BaseEvent } from 'nestjs-event-sourcing';
import { AccountType } from '../common/enums/account-type.enum';
import { OpenAccountCommand } from './open-account.command';

export const ACCOUNT_OPENED_EVENT_NAME: string = 'AccountOpenedEvent';

export class AccountOpenedEvent extends BaseEvent {
  public holder: string;
  public email: string;
  public type: AccountType;
  public openingBalance: number;
  public createdDate: Date;

  constructor(command?: OpenAccountCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.getId();
    this.holder = command.getHolder();
    this.email = command.getEmail();
    this.type = command.getType();
    this.openingBalance = command.getOpeningBalance();
    this.createdDate = new Date();
  }
}
