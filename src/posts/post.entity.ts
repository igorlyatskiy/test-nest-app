import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public userId: string;

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
}
