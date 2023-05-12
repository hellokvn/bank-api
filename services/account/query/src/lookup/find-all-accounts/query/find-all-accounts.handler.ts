import { Account } from '@app/common/entity/account.entity';
import { FindAllAccountsResponseData } from '@bank/sdk';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllAccountsQuery } from './find-all-accounts.query';

@QueryHandler(FindAllAccountsQuery)
export class FindAllAccountsQueryHandler implements ICommandHandler<FindAllAccountsQuery> {
  @InjectRepository(Account)
  private readonly repository: Repository<Account>;

  public async execute(query: FindAllAccountsQuery): Promise<FindAllAccountsResponseData> {
    const take: number = 15;
    const total: number = await this.repository.count();
    const pageLength: number = Math.ceil(total / take) || 1;
    const page: number = query.page > pageLength ? 1 : query.page;
    const skip: number = page > 1 ? take * (page - 1) : 0;
    const accounts: Account[] = await this.repository.find({
      skip,
      take,
      select: ['id', 'holder', 'isActive'],
    });

    return { accounts, page, total, count: accounts.length };
  }
}
