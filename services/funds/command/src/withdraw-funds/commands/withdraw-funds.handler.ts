import { FundsAggregate } from '@app/common/aggregates/funds.aggregate';
import {
  AccountQueryServiceClient,
  ACCOUNT_QUERY_SERVICE_NAME,
  FindAccountResponse,
  WithdrawFundsCommand,
} from '@bank/sdk';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { firstValueFrom } from 'rxjs';

@CommandHandler(WithdrawFundsCommand)
export class WithdrawFundsHandler implements ICommandHandler<WithdrawFundsCommand> {
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

  public async execute(command: WithdrawFundsCommand): Promise<void | never> {
    console.log('WithdrawFundsHandler/execute');
    const res: FindAccountResponse = await firstValueFrom(this.accountQueryService.findAccount({ id: command.id }));

    if (!res || !res.data) {
      throw new HttpException('Account not found!', HttpStatus.NOT_FOUND);
    }

    const aggregate: FundsAggregate = await this.eventSourcingHandler.getById(FundsAggregate, command.id);

    if (command.getAmount() > aggregate.getBalance()) {
      throw new HttpException('Withdraw declined, insufficient funds!', HttpStatus.CONFLICT);
    }

    this.publisher.mergeObjectContext(aggregate as any);
    aggregate.withdrawFunds(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
