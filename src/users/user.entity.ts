import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  activationCode: string;

  @Column()
  activated: boolean;

  @OneToMany(() => Post, (post) => post.user, { eager: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { eager: false })
  comments: Comment[];
}
