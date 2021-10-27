import { User } from '../user.entity';

export interface ExtendedRequest extends Request {
  user: User;
}
