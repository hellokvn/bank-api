import { FundsAggregate } from '@app/common/aggregates/funds.aggregate';
import {
  AccountQueryServiceClient,
  ACCOUNT_QUERY_SERVICE_NAME,
  DepositFundsCommand,
  FindAccountResponse,
} from '@bank/sdk';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { firstValueFrom } from 'rxjs';

@CommandHandler(DepositFundsCommand)
export class DepositFundsHandler implements ICommandHandler<DepositFundsCommand> {
  private accountQueryService: AccountQueryServiceClient;

  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<FundsAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  @Inject(ACCOUNT_QUERY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.accountQueryService = this.client.getService<AccountQueryServiceClient>(ACCOUNT_QUERY_SERVICE_NAME);
  }

  public async execute(command: DepositFundsCommand): Promise<void | never> {
    const res: FindAccountResponse = await firstValueFrom(this.accountQueryService.findAccount({ id: command.id }));

    if (!res || !res.data) {
      throw new HttpException('Account not found!', HttpStatus.NOT_FOUND);
    }

    const aggregate: FundsAggregate = await this.eventSourcingHandler.getById(FundsAggregate, command.id);

    this.publisher.mergeObjectContext(aggregate as any);
    aggregate.depositFunds(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
