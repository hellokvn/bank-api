import { Account } from '@app/common/entity/account.entity';
import { AccountClosedEvent } from '@bank/sdk';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@EventsHandler(AccountClosedEvent)
export class AccountClosedHandler implements IEventHandler<AccountClosedEvent> {
  @InjectRepository(Account)
  private repository: Repository<Account>;

  public async handle({ id }: AccountClosedEvent) {
    const account: Account = await this.repository.findOneBy({ id });

    if (!account) {
      throw new HttpException('No account found', HttpStatus.NO_CONTENT);
    }

    this.repository.update(account.id, { isActive: false });
  }
}
