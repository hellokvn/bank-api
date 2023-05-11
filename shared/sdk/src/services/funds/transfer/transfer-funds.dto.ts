import { IsNumber, IsUUID, Min } from 'class-validator';
import { TransferFundsRequest } from '../../../pb/funds-command.pb';

export class TransferFundsDto implements TransferFundsRequest {
  @IsUUID()
  public readonly fromId: string;

  @IsUUID()
  public readonly toId: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(1)
  public readonly amount: number;
}
