import { FUNDS_COMMAND_SERVICE_NAME, WithdrawFundsCommand, WithdrawFundsDto, WithdrawFundsResponse } from '@bank/sdk';
import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class WithdrawFundsController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(FUNDS_COMMAND_SERVICE_NAME, 'WithdrawFunds')
  private async withdrawFunds(@Body() payload: WithdrawFundsDto): Promise<WithdrawFundsResponse> {
    console.log('');
    console.log('WithdrawFundsController/withdrawFunds');
    const command: WithdrawFundsCommand = new WithdrawFundsCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }
}
