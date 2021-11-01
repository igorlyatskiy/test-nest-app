import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  @Column({ name: 'userId' })
  userId: string;

  @Column({ name: 'postId' })
  postId: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user: User) => user.comments, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    referencedColumnName: 'userId',
    name: 'userId',
  })
  user: User;

  @ManyToOne(() => Post, (post: Post) => post.comments, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    referencedColumnName: 'postId',
    name: 'postId',
  })
  post: Post;
}
