import { FundsAggregate } from '@app/common/aggregates/funds.aggregate';
import { ReceiveFundsCommand } from '@bank/sdk';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

@CommandHandler(ReceiveFundsCommand)
export class RceiveFundsHandler implements ICommandHandler<ReceiveFundsCommand> {
  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<FundsAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  public async execute(command: ReceiveFundsCommand): Promise<any | never> {
    console.log('RceiveFundsHandler excuted GOOD');
    const aggregate: FundsAggregate = await this.eventSourcingHandler.getById(FundsAggregate, command.id);

    this.publisher.mergeObjectContext(aggregate as any);
    aggregate.receiveFunds(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
