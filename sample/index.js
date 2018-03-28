'use strict';
const winston = require('winston');
const Residue = require('residue-winston');

let createLogger = (options) => new winston.Logger(options);
//
// for 3.0.0+
// createLogger = winston.createLogger;

const logger = createLogger({
  level: 'info',
  transports: [
      new winston.transports.File({ filename: 'combined.log' }),
      new Residue({
          config_file: '/Users/majid.khan/Projects/residue-node/samples/client.conf.json',
          logger_id: 'sample-app',
      })
  ]
});

logger.info('this is test');
logger.error('this is test');
logger.debug('this is test');
logger.silly('this is test');
logger.warn('this is test');
logger.verbose('this is test');

