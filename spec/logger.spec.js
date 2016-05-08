'use strict';

process.env.NODE_ENV = 'production';

//dependencies
var path = require('path');
var expect = require('chai').expect;
var Logger = require(path.join(__dirname, '..'));
var logger = Logger.logger;

describe('byteskode logger', function() {

    it('should expose mongoose Log model', function() {
        expect(Logger.Log).to.exist;
    });

    it('should have the proper methods defined', function() {
        expect(logger.log).to.be.a.function;
    });


    describe.skip('the log() method', function() {
        it('should respond with true', function(done) {
            done();
        });
    });

    describe('the query() method', function() {

        before(function(done) {
            logger.log('info', 'hello world', {}, done);
        });

        describe('using basic querying', function() {

            it('should return matching results', function(done) {
                logger.query(function(error, result) {
                    result = result.Mongoose;
                    var log = result.pop();
                    expect(log.level).to.equal('info');
                    expect(log.message).to.equal('hello world');
                    done(error, result);
                });
            });
        });

        describe('using the `rows` option', function() {

            it('should return one result', function(done) {
                logger.query({ rows: 1 }, function(error, result) {
                    result = result.Mongoose;
                    var log = result.pop();
                    expect(log.level).to.equal('info');
                    expect(log.message).to.equal('hello world');
                    done(error, result);
                });
            });

        });

        describe('using `fields` and `order` option', function() {

            it('should return matching results', function(done) {
                logger.query({ order: 'asc', fields: ['timestamp'] }, function(error, result) {
                    result = result.Mongoose;
                    var log = result.pop();
                    expect(log).to.have.property('timestamp');
                    done(error, result);
                });
            });

        });

        describe('using the `from` and `until` option', function() {
            it('should return matching results', function(done) {
                var start = Date.now() - (100 * 1000);
                var end = Date.now() + (100 * 1000);

                logger.query({ from: start, until: end }, function(error, result) {
                    result = result.Mongoose;
                    var log = result.pop();
                    expect(log.level).to.equal('info');
                    expect(log.message).to.equal('hello world');
                    expect(log).to.have.property('timestamp');
                    done(error, result);
                });
            });
        });

        describe('using a bad `from` and `until` option', function() {
            it('should return no results', function(done) {
                var start = Date.now() + 1000000;
                var end = Date.now() + 1000000;

                logger.query({ from: start, until: end }, function(error, result) {
                    result = result.Mongoose;
                    expect(result).to.have.length(0);
                    done(error, result);
                });
            });
        });
    });

});