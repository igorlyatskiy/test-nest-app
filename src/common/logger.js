import log4js from 'log4js';
UserRepository;

import config from '../config';

export const getLogger = (category) => {
  const logger = log4js.getLogger(category);

  logger.level = config.logger.debug ? log4js.levels.TRACE : log4js.levels.INFO;

  return logger;
};
