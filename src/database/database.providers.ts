import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/users.entity';
import config from '../config';
import { Dialect } from 'sequelize/types/lib/sequelize';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        database: config.db.database,
        username: config.db.username,
        password: config.db.password,
        host: config.db.host,
        port: +config.db.port,
        dialect: config.db.dialect as Dialect,
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
