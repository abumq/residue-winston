//
// Winston transport for residue
//
// Copyright 2017-present Zuhd Web Services
//
// Author: @abumusamq
//
// https://muflihun.com
// https://zuhd.org
// https://github.com/zuhd-org/residue-winston
//

"use strict";

const util = require('util');
const residue_internal = require('residue');
const winston = require('winston')
const TransportStream = require('winston-transport');

const Residue = module.exports = function(options) {
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
    this.logger.log_sources = {
        base_idx: this.logger.log_sources.base_idx + (options.log_source_layer_count || 6),
        getSourceFile: this.logger.log_sources.getSourceFile,
        getSourceLine: this.logger.log_sources.getSourceLine,
        getSourceFunc: this.logger.log_sources.getSourceFunc,
    };
};

// Inherit from `winston.Transport`
util.inherits(Residue, TransportStream);

// Transport name
Residue.prototype.name = 'residue';

// Backwards compatibility
winston.transports.Residue = Residue;

// Winston Transport Function
Residue.prototype.log = function(arg1, arg2, meta, cb) {

    const level = typeof arg1 === 'string' ? arg1 : arg1.level;
    const msg = typeof arg2 === 'string' ? arg2 : arg1.message;
    const callback = typeof arg2 === 'function' ? arg2 : cb;

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

module.exports.residue_internal = residue_internal;
