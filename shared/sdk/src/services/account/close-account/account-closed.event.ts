import { BaseEvent } from 'nestjs-event-sourcing';
import { CloseAccountCommand } from './close-account.command';

export const ACCOUNT_CLOSED_EVENT_NAME: string = 'AccountClosedEvent';

export class AccountClosedEvent extends BaseEvent {
  constructor(command?: CloseAccountCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.id;
  }
}
