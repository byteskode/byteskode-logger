'use strict';

/**
 * @name byteskode-logger
 * @description byteskode logger utility
 * @singleton
 */

//set environment to development by default
if (!(process.env || {}).NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

//suppress configuration warning
process.env.SUPPRESS_NO_CONFIG_WARNING = true;

//dependencies
var config = require('config');
var path = require('path');
var winston = require('winston');
var _ = require('lodash');
var mongoose = require('mongoose');
var environment = require('execution-environment');
var LogSchema = require(path.join(__dirname, 'lib', 'schema'));
require(path.join(__dirname, 'lib', 'mongoose_transport'));
var transports = [];

//NOTE: all logger configuration are loaded from config
//NOTE: environment variables are loaded from execution-environment

//prepare default configurations
exports.defaults = {
    console: {
        timestamp: true,
        level: 'silly',
        color: true
    },
    mongoose: {
        timestamp: true,
        level: 'silly',
        model: 'Log'
    }
};


//prepare logger configuration
var _config = config.has('logger') ? config.get('logger') : {};
exports.config = _.merge({}, exports.defaults, _config);


//configure execution-environment
if (!environment.isLocal) {
    environment.registerEnvironments({
        isLocal: ['test', 'dev', 'development']
    });
}


//development, test environment logger(s)
if (environment.isLocal()) {
    transports.push(new(winston.transports.Console)(exports.config.console));
}


//production logger(s)

//mongoose logger transports
if (!environment.isLocal() && exports.config.mongoose) {

    // initialize mongoose log model
    var modelName = exports.config.mongoose.model;
    if (!mongoose.model(modelName)) {
        exports.Log = mongoose.model(modelName, LogSchema);
    }

    transports.push(new(winston.transports.Mongoose)(exports.config.mongoose));
}


//export logger
if (!exports.logger) {
    exports.logger = new(winston.Logger)({
        transports: transports
    });
}