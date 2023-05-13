import { Funds } from '@app/common/entity/funds.entity';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetBalanceQuery } from './get-balancet.query';

@QueryHandler(GetBalanceQuery)
export class GetBalanceQueryHandler implements ICommandHandler<GetBalanceQuery> {
  @InjectRepository(Funds)
  private readonly repository: Repository<Funds>;

  public execute({ id }: GetBalanceQuery): Promise<Funds> {
    return this.repository.findOneBy({ id });
  }
}
