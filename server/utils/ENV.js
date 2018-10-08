var properties, path,
    config = require('../config'),
    PropertiesReader = require('properties-reader'),
    fs = require('fs');

//First check for dev-path
path = './.env';
if (!fs.existsSync(path)) {
    //Check for staging/production
    path = '/var/local/app-config/.env';
    if (!fs.existsSync(path)) {
        console.log('.env file not found in expected locations');
    }
}
properties = PropertiesReader(path);


module.exports = {

    getProp: function (prop) {
        var value = properties.get(prop);
        return (value || "");
    },

    loadEnvProperties: function () {
        //ENVIRONMENT
        process.env.ENV_NAME = this.getProp('ENVIRONMENT.ENV_NAME') || 'development';

        //MONGODB
        process.env.MONGODB_CONNECTION_STRING = this.getProp('MONGODB.CONNECTION_STRING');

        //REDIS
        process.env.REDIS_HOST = this.getProp('REDIS.HOST');
        process.env.REDIS_PORT = this.getProp('REDIS.PORT');
        process.env.REDIS_PASSWORD = this.getProp('REDIS.PASSWORD');

        //APPLICATION
        process.env.APPLICATION_PORT = this.getProp('APPLICATION.PORT');


	}
};

