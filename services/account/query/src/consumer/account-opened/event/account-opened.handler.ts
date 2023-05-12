import { Account } from '@app/common/entity/account.entity';
import { AccountOpenedEvent, ACCOUNT_OPENED_EVENT_NAME } from '@bank/sdk';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedHandler implements IEventHandler<AccountOpenedEvent> {
  @InjectRepository(Account)
  private readonly repository: Repository<Account>;

  public handle(event: AccountOpenedEvent): Promise<Account> {
    console.log('AccountOpenedHandler/handle', { event });
    const account = new Account(ACCOUNT_OPENED_EVENT_NAME, event);

    return this.repository.save(account);
  }
}
