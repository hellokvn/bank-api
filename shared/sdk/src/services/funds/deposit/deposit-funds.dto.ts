import { IsNumber, IsUUID, Min } from 'class-validator';
import { DepositFundsRequest } from '../../../pb/funds-command.pb';

export class DepositFundsDto implements DepositFundsRequest {
  @IsUUID()
  public id: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(1)
  public amount: number;
}
