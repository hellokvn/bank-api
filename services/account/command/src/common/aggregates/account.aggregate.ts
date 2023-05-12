import { ExtendedAggregateRoot } from 'nestjs-event-sourcing';

export class AccountAggregate extends ExtendedAggregateRoot {
  private isActive: boolean;
  private balance: number;

  public getActive(): boolean {
    return this.isActive;
  }

  public setActive(value: boolean): void {
    this.isActive = value;
  }

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(value: number): void {
    this.balance = value;
  }
}
