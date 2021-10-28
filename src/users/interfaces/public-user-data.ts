import { Post } from '../../posts/post.entity';

export interface PublicUserData {
  userId: string;
  email: string;
  phone: string | null;
  nickname: string | null;
  posts: Post[];
}
