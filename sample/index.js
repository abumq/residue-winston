'use strict';
const winston = require('winston');
const Residue = require('residue-winston');
const residue_internal = Residue.residue_internal;

console.log(`Residue library version ${residue_internal.version()}-${residue_internal.type()}`); 

let createLogger = (options) => new winston.Logger(options);
//
// for winston 3.0.0+
// createLogger = winston.createLogger;

const logger = createLogger({
  level: 'info',
  transports: [
      new winston.transports.File({ filename: 'combined.log' }),
      new Residue({
          config_file: 'client.conf.json',
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

// residue_logger is more advanced
const residue_logger = residue_internal.getLogger('sample-app');
residue_logger.info('this is test %s', {name: 'Adam'});

