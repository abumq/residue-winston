//
// Winston transport for residue
//
// Copyright 2017-present Muflihun Labs
//
// Author: @abumusamq
//
// https://muflihun.com
// https://muflihun.github.io/residue
// https://github.com/muflihun/residue-winston
//

"use strict";

const util = require('util');
const residue_internal = require('residue');
const winston = require('winston')
const TransportStream = require('winston-transport');

const Residue = function(options) {
    if (!options) {
        throw "Please provide residue-node options";
    }
    if (!options.logger_id) {
        throw "Please provide logger_id in options";
    }

    TransportStream.call(this, options);
    if (options.config_file) {
        residue_internal.loadConfiguration(options.config_file);
    } else {
      residue_internal.loadConfiguration(options);
    }
    residue_internal.connect();
    this.logger = residue_internal.getLogger(options.logger_id);
};

// Inherit from `winston.Transport`
util.inherits(Residue, TransportStream);

// Transport name
Residue.prototype.name = 'residue';

// Backwards compatibility
winston.transports.Residue = Residue;

// Winston Transport Function
Residue.prototype.log = function(arg1, arg2) {

    const level = typeof arg1 === 'string' ? arg1 : arg1.level;
    const msg = typeof arg2 === 'string' ? arg2 : arg1.message;
    const callback = typeof arg2 === 'function' ? arg2 : null;

    switch (level) {
        case 'info':
            this.logger.info(msg);
            break;
        case 'error':
            this.logger.error(msg);
            break;
        case 'warn':
            this.logger.warn(msg);
            break;
        case 'debug':
            this.logger.debug(msg);
            break;
        case 'silly':
            this.logger.info(msg);
            break;
        case 'verbose':
            this.logger.verbose(1, msg);
            break;
        default:
            this.logger.info(msg);
            break;
    }

    this.emit('logged');

    if (callback) {
        callback();
    }
};

module.exports.residue = Residue;
module.exports.residue_internal = residue_internal;
