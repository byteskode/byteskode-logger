'use strict';


/**
 * @name Mongoose
 * @description winston mongoose logger implementation
 */

//dependencies
var path = require('path');
var util = require('util');
var winston = require('winston');
var mongoose = require('mongoose');
var _ = require('lodash');
var LogSchema = require(path.join(__dirname, 'schema'));
var LogModel = null;

var Mongoose = winston.transports.Mongoose = function(options) {
    this.name = 'mongooseLogger';

    options = _.merge({}, options, {
        model: 'Log',
        level: 'silly'
    });

    this.level = options.level;

    //TODO set schema collection name

    // initialize mongoose Log model
    if (!mongoose.model(options.model)) {
        LogModel = mongoose.model(options.model, LogSchema);
    }

};

util.inherits(Mongoose, winston.Transport);


/**
 * @function
 * @name log
 * @description log into mongoose collection
 */
Mongoose.prototype.log = function(level, message, metadata, callback) {

    var entry = new LogModel({
        level: level,
        message: message,
        metadata: metadata
    });

    entry.save(function(error) {
        return callback(error, true);
    });

};

module.exports = Mongoose;