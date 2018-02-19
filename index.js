const util = require('util');
const residue = require('residue');
const TransportStream = require('winston-transport');
const { LEVEL, MESSAGE } = require('triple-beam');

var Residue = module.exports = function(options) {
    options = options || {}; // todo: default options
    TransportStream.call(this, options);
    residue.loadConfiguration(options);
    residue.connect();
    this.logger = residue.getLogger('sample-app');
};

util.inherits(Residue, TransportStream);

Residue.prototype.name = 'residue';

Residue.prototype.log = function (info, callback) {
  var self = this;
  setImmediate(function () {
    self.emit('logged', info);
  });
 
console.log(info);
  this.logger.info(info[MESSAGE]);

  if (callback) { callback(); } // eslint-disable-line
};
