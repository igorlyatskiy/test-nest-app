import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column({ name: 'userId' })
  userId: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({
    nullable: true,
    default: 0,
  })
  likes: string;

  @Column({
    nullable: true,
    default: 0,
  })
  dislikes: string;

  @ManyToOne(() => User, (user: User) => user.posts, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    referencedColumnName: 'userId',
    name: 'userId',
  })
  user: User;
}
