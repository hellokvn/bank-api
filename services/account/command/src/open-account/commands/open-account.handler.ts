import { OpenAccountCommand } from '@bank/sdk';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { OpenAccountAggregate } from '../aggregates/open-account.aggregate';

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandler implements ICommandHandler<OpenAccountCommand> {
  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<OpenAccountAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  public async execute(command: OpenAccountCommand): Promise<void> {
    console.log('OpenAccountHandler/execute');
    const aggregate: OpenAccountAggregate = new OpenAccountAggregate();

    this.publisher.mergeObjectContext(aggregate);
    aggregate.openAccount(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
