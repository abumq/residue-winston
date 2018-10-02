'use strict';
const winston = require('winston');
const ResidueClient = require('residue-winston');
const residueInstance = ResidueClient.instance;

console.log(`Residue library version ${residueInstance.version()}-${residueInstance.type()}`);

let createLogger = (options) => new winston.Logger(options);
//
// for winston 3.0.0+
// createLogger = winston.createLogger;

const wlogger = createLogger({
  level: 'info',
  transports: [
      new winston.transports.File({ filename: 'combined.log' }),
      new ResidueClient({
          config_file: 'client.conf.json',
          logger_id: 'sample-app',
      })
  ]
});

wlogger.info('this is test');
wlogger.error('this is test');
wlogger.debug('this is test');
wlogger.silly('this is test');
wlogger.warn('this is test');
wlogger.verbose('this is test');

// residueInstance is more advanced
const logger = residueInstance.getLogger('sample-app');
logger.info('this is test %s', {name: 'Adam'});
