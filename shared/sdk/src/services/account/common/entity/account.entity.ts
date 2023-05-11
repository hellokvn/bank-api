import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { AccountOpenedEvent } from '../../../account/open-account';
import { AccountType } from '../enums';

@Entity()
export class Account {
  constructor(eventName?: string, payload?: AccountOpenedEvent) {
    if (payload && eventName === 'AccountOpenedEvent') {
      this.id = payload.id;
      this.holder = payload.holder;
      this.type = payload.type;
      this.email = payload.email;
      this.createdDate = payload.createdDate;

      return this;
    }
  }

  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  public holder: string;

  @Column()
  public email: string;

  @Column({ type: 'enum', enum: AccountType })
  public type: AccountType;

  @Column({ name: 'is_active', default: true })
  public isActive: boolean;

  @CreateDateColumn({ name: 'created_date' })
  public createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  public updatedDate: Date;
}
