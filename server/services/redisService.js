var config = require('../config'),
    redis = require("redis"),
    _ = require('lodash'),
    async = require('async');

module.exports = {
    createClient: function (isAppClient, callback) {
        var redisClient, redisPassword,
            options = {
                port: process.env.REDIS_PORT,
                host: process.env.REDIS_HOST,
                no_ready_check: true,
                disable_resubscribing: true,
                retry_strategy: this.getRetryStrategy
            };

        redisClient = redis.createClient(options);
        redisPassword = process.env.REDIS_PASSWORD;

        if (redisPassword) {
            redisClient.auth(redisPassword, function (err) {
                if (err) {
                    throw err;
                }
                //console.log('Authenticated Redis');
            });
        }

        redisClient.on('connect', function() {
            //console.log('Redis Connected!');
            if (callback) {
                callback();
            }
        });

        if (isAppClient) {
            this.appRedisClient = redisClient;
        }

        return redisClient;
    },

    getRetryStrategy: function (options) {
    	console.log(options)
        if (options && options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with a individual error
            return new Error('The server refused the connection');
        }
        if (options && options.total_retry_time > config.sessionTimeout) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error('Retry time exhausted');
        }
        if (options && options.times_connected > 10) {
            // End reconnecting with built in error
            return undefined;
        }
		options.attempt = options.attempt || 10;
        // try to reconnect after
        return Math.min(options.attempt * 100, 3000);
    }

};

