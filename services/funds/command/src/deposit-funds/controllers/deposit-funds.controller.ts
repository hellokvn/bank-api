import { DepositFundsCommand, DepositFundsDto, DepositFundsResponse, FUNDS_COMMAND_SERVICE_NAME } from '@bank/sdk';
import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class DepositFundsController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(FUNDS_COMMAND_SERVICE_NAME, 'DepositFunds')
  private async depositFunds(@Body() payload: DepositFundsDto): Promise<DepositFundsResponse> {
    const command: DepositFundsCommand = new DepositFundsCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }
}
