'use strict';

/**
 * @name byteskode-logger
 * @description byteskode logger utility
 */

//dependencies
var config = require('config');
var path = require('path');
var winston = require('winston');
var _ = require('lodash');
var environment = require('execution-environment');
var mkdir = require('mkdir-p');
require(path.join(__dirname, 'lib', 'mongoose_transport'));
var transports = [];

//NOTE: all logger configuration are loaded from config
//NOTE: environment variables are loaded from execution-environment

//obtain logger configuration
var loggerConfig = config('logger');

//configure execution-environment
if (!environment.isLocal) {
    environment.registerEnvironments({
        isLocal: ['test', 'dev', 'development']
    });
}

//development, test logger(s)

//add development and test console logger transports
if (environment.isLocal()) {
    //obtain console transport configuration from config
    var consoleTransportConfig = _.merge({}, {
        timestamp: true,
        level: 'silly',
        color: true
    }, loggerConfig.console);

    transports.push(new(winston.transports.Console)(consoleTransportConfig));
}


//production logger(s)


//add production file logger transports
if (!environment.isLocal() && !loggerConfig.mongoose) {
    //obtain file transport configuration from config
    var fileTransportConfig = _.merge({}, {
        timestamp: true,
        level: 'silly',
        dir: path.join(process.cwd(), 'logs'),
        file: 'logs.json'
    }, loggerConfig.file);

    //ensure logs directory exists
    mkdir.sync(path.join(process.cwd(), fileTransportConfig.dir));

    //set filename
    fileTransportConfig.filename =
        path.join(process.cwd(), fileTransportConfig.dir, fileTransportConfig.file);

    transports.push(new(winston.transports.File)(fileTransportConfig));
}


//add production mongoose logger transports
if (!environment.isLocal() && loggerConfig.mongoose) {
    //obtain mongoose transport configuration from config
    var mongooseTransportConfig = _.merge({}, {
        timestamp: true,
        level: 'silly',
        color: true
    }, loggerConfig.mongoose);

    transports.push(new(winston.transports.Mongoose)(mongooseTransportConfig));
}


//export logger
if (!exports.logger) {
    exports.logger = new(winston.Logger)({
        transports: transports
    });
}