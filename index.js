const util = require('util');
const residue = require('residue');
const TransportStream = require('winston-transport');

var Residue = module.exports = function(options) {
    if (!options) {
        throw new Exception("Please provide residue-node options");
    }
    if (!options.logger_id) {
        throw new Exception("Please provide logger_id in options");
    }

    TransportStream.call(this, options);
    residue.connect(options);
    this.logger = residue.getLogger(options.logger_id);
};

util.inherits(Residue, TransportStream);

Residue.prototype.name = 'residue';

Residue.prototype.log = function (info, callback) {
  var self = this;
  setImmediate(function () {
    self.emit('logged', info);
  });
 
  console.log(info);

  switch (info.level) {
  case 'info':
    this.logger.info(info.message);
    break;
  case 'error':
    this.logger.error(info.message);
    break;
  case 'warn':
    this.logger.warning(info.message);
    break;
  default:
    this.logger.info(info.message);
    break;
    
  }

  if (callback) { callback(); } // eslint-disable-line
};
