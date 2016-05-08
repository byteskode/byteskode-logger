'use strict';


/**
 * @name MongooseTransport
 * @description winston mongoose logger implementation
 */

//dependencies
var util = require('util');
var winston = require('winston');
var mongoose = require('mongoose');
var _ = require('lodash');


var MongooseTransport = winston.transports.Mongoose = function(options) {
    this.name = 'Mongoose';

    options = _.merge({}, options, {
        model: 'Log',
        level: 'silly'
    });

    this.level = options.level;

    this.model = options.model;
};

util.inherits(MongooseTransport, winston.Transport);


/**
 * @function
 * @name log
 * @description log into mongoose collection
 */
MongooseTransport.prototype.log = function(level, message, metadata, callback) {
    //obtain Log model
    var Log = mongoose.model(this.model);

    Log.create({
        level: level,
        message: message,
        metadata: metadata
    }, callback);

};

module.exports = MongooseTransport;