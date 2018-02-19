//
// Winston transport for residue
//
// Copyright 2017-present Muflihun Labs
//
// This module provides interface for connecting and interacting with
// residue server seamlessly. Once you are connected this module
// takes care of lost connections, expired tokens, expired clients
// and keep itself updated with latest tokens and touch server when 
// needed to stay alive.
//
// Author: @abumusamq
//
// https://muflihun.com
// https://muflihun.github.io/residue
// https://github.com/muflihun/residue-winston
//

"use strict";

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
    this._residue = residue; // for export purposes
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
    this.logger.warn(info.message);
    break;
  case 'debug':
    this.logger.debug(info.message);
    break;
  case 'silly':
    this.logger.info(info.message);
    break;
  case 'verbose':
    this.logger.verbose(1, info.message);
    break;
  default:
    this.logger.info(info.message);
    break;
    
  }

  if (callback) { callback(); } // eslint-disable-line
};
