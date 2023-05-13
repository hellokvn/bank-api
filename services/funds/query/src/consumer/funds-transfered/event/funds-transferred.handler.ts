import { Funds } from '@app/common/entity/funds.entity';
import { FundsTransferredEvent } from '@bank/sdk';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@EventsHandler(FundsTransferredEvent)
export class FundsTransferredHandler implements IEventHandler<FundsTransferredEvent> {
  @InjectRepository(Funds)
  private readonly repository: Repository<Funds>;

  public async handle(event: FundsTransferredEvent): Promise<void> {
    if (event.version === 0) {
      const funds: Funds = new Funds();

      funds.id = event.id;
      funds.balance = event.amount;

      await this.repository.save(funds);

      return;
    }

    const funds: Funds = await this.repository.findOneBy({ id: event.id });

    if (!funds) {
      throw new HttpException('No account found', HttpStatus.NO_CONTENT);
    }

    this.repository.update(funds.id, { balance: funds.balance - event.amount });
  }
}
