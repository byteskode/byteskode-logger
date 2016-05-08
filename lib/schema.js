'use strict';

/**
 * @name LogSchema
 * @description mongoose schema implementation of winston log
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;

var LogSchema = new Schema({
    /**
     * @name label
     * @description additional info to attach to this logger
     *              e.g Mailer as flag for logs from mailer
     * @type {Object}
     */
    label: {
        type: String
    },


    /**
     * @name level
     * @description log level
     * @type {Object}
     */
    level: {
        type: String
    },


    /**
     * @name message
     * @description log message
     * @type {Object}
     */
    message: {
        type: String
    },


    /**
     * @name metadata
     * @description log metadata
     * @type {Object}
     */
    metadata: {
        type: Mixed
    },


    /**
     * @name timestamp
     * @description log time
     * @type {Object}
     */
    timestamp: {
        type: Date,
        default: Date.now
    }
});

//exports log schema
module.exports = LogSchema;