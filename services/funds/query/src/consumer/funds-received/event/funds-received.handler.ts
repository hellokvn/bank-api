import { Funds } from '@app/common/entity/funds.entity';
import { FundsReceivedEvent } from '@bank/sdk';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@EventsHandler(FundsReceivedEvent)
export class FundsReceivedHandler implements IEventHandler<FundsReceivedEvent> {
  @InjectRepository(Funds)
  private readonly repository: Repository<Funds>;

  public async handle(event: FundsReceivedEvent): Promise<void> {
    const funds: Funds = await this.repository.findOneBy({ id: event.id });

    if (!funds) {
      throw new HttpException('No account found', HttpStatus.NO_CONTENT);
    }

    this.repository.update(funds.id, { balance: funds.balance + event.amount });
  }
}
