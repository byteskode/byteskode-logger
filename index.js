'use strict';

/**
 * @name byteskode-logger
 * @description byteskode logger utility
 */

//dependencies
var config = require('config');
var path = require('path');
var winston = require('winston');
var environment = require('execution-environment');
var transports = [];

//NOTE: all logger configuration are loaded from config
//NOTE: environment variables are loaded from execution-environment

//add development and test logger transports
if (environment.isLocal()) {
    transports.push(new(winston.transports.Console)({
        timestamp: true,
        level: config.get('logger.level') || '',
        color: true
    }));
}

//add production logger transports
if (!environment.isLocal()) {
    transports.push(new(winston.transports.File)({
        timestamp: true,
        level: config.get('logger.level') || '',
        filename: path.join(
            __dirname, '..', '..',
            config.get('logger.dir'),
            config.get('logger.file')
        )
    }));
}

//export logger
if (!exports.logger) {
    exports.logger = new(winston.Logger)({
        transports: transports
    });
}