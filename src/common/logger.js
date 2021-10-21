import log4js from 'log4js';

import config from '../config';

const getLogger = (category) => {
  const logger = log4js.getLogger(category);

  logger.level = config.logger.debug ? log4js.levels.TRACE : log4js.levels.INFO;

  return logger;
};

module.exports = getLogger;
