import { ACCOUNT_COMMAND_SERVICE_NAME, CloseAccountCommand, CloseAccountDto, CloseAccountResponse } from '@bank/sdk';
import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class CloseAccountController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(ACCOUNT_COMMAND_SERVICE_NAME, 'CloseAccount')
  private async openAccount(@Body() payload: CloseAccountDto): Promise<CloseAccountResponse> {
    const command: CloseAccountCommand = new CloseAccountCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }
}
