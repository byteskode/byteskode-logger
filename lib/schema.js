'use strict';

/**
 * @name LogSchema
 * @description winston mongoose log schema
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
    level: String,
    message: String,
    metadata: Schema.Types.Mixed,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = LogSchema;