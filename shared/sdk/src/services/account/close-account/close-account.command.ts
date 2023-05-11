import { CloseAccountDto } from './close-account.dto';

export class CloseAccountCommand {
  public id: string;

  constructor(payload: CloseAccountDto) {
    this.id = payload.id;
  }
}
