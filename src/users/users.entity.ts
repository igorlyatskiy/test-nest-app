import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;
}
