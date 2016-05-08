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

    options = _.merge({}, {
        model: 'Log',
        level: 'silly'
    }, options);

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
    var Log = mongoose.model(this.model || MongooseTransport.model);

    Log.create({
        level: level,
        message: message,
        metadata: metadata,
        label: (metadata || {}).label
    }, callback);

};

MongooseTransport.prototype.query = function(options, callback) {

    if (options && _.isFunction(options)) {
        callback = options;
        options = {};
    }

    options = this.normalizeQuery(options);

    var criteria = {};

    if (options.from) {
        criteria.timestamp = criteria.timestamp || {};
        criteria.timestamp.$gte = options.from;
    }

    if (options.until) {
        criteria.timestamp = criteria.timestamp || {};
        criteria.timestamp.$lte = options.until;
    }

    var opt = {
        skip: options.start,
        limit: options.rows,
        sort: { timestamp: options.order === 'desc' ? -1 : 1 }
    };

    if (options.fields) {
        opt.select = options.fields;
    }

    //obtain Log model
    var Log = mongoose.model(this.model || MongooseTransport.model);

    var query = Log.find(criteria);

    if (opt.skip) {
        query.skip(opt.skip);
    }

    if (opt.limit) {
        query.limit(opt.limit);
    }

    if (opt.sort) {
        query.sort(opt.sort);
    }

    if (opt.select) {
        if (_.isArray(opt.select)) {
            opt.select = opt.select.join(' ,');
        }
        query.select(opt.select);
    }

    query.exec(callback);
};

module.exports = MongooseTransport;