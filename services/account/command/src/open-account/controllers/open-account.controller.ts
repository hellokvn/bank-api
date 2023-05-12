import { ACCOUNT_COMMAND_SERVICE_NAME, OpenAccountCommand, OpenAccountDto, OpenAccountResponse } from '@bank/sdk';
import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class OpenAccountController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(ACCOUNT_COMMAND_SERVICE_NAME, 'OpenAccount')
  private async openAccount(@Body() payload: OpenAccountDto): Promise<OpenAccountResponse> {
    console.log('OpenAccount');
    const command: OpenAccountCommand = new OpenAccountCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, data: command.getId(), error: null };
  }
}
