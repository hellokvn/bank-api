import { CloseAccountCommand } from '@bank/sdk';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { CloseAccountAggregate } from '../aggregates/close-account.aggregate';

@CommandHandler(CloseAccountCommand)
export class CloseAccountHandler implements ICommandHandler<CloseAccountCommand> {
  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<CloseAccountAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  public async execute(command: CloseAccountCommand): Promise<void> {
    console.log('CloseAccountHandler/execute');
    const aggregate: CloseAccountAggregate = await this.eventSourcingHandler.getById(CloseAccountAggregate, command.id);

    this.publisher.mergeObjectContext(aggregate);
    aggregate.closeAccount(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
