import { User } from './users.entity';
import { USERS_REPOSITORY } from '../constants';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
