import { Account } from '@app/common/entity/account.entity';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAccountQuery } from './find-account.query';

@QueryHandler(FindAccountQuery)
export class FindAccountQueryHandler implements ICommandHandler<FindAccountQuery> {
  @InjectRepository(Account)
  private readonly repository: Repository<Account>;

  public execute({ id }: FindAccountQuery): Promise<Account> {
    return this.repository.findOneBy({ id });
  }
}
