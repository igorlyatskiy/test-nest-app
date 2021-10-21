import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity()
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.posts)
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
