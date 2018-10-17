'use strict';

var redisService = require('../services/redisService'),
    sessionSocketService = require('../services/sessionSocketService'),
    fs = require('fs'),
    _ = require('lodash'),
    files = fs.readdirSync(__dirname);

module.exports = function (io, appRedisClient) {
    
    io.on('connection', function (socket) {

        var pub, sub, conCallback,
            counter = 0,
            session = socket.request.session,
            user = session.user,
            newConnection;

        conCallback = function () {
            counter++;
            //when pub/sub both connected
            if (counter === 2) {
                socket.emit('socket-pub-sub-connected');
                newConnection = {
                    sessionId: session.id,
                    user   : user,
                    socket : socket,
                    pub    : pub,
                    sub    : sub
                };

                console.log("Connecting user: ", user.fullName);
                sessionSocketService.uptoDateMyConnectionStatus(user, newConnection, appRedisClient);

                files.forEach(function (file) {
                    if (file === 'index.js' || file.indexOf('.js') === -1) {
                        return;
                    }
                    var name =  file.replace(/\.js$/, '');
                    require('./' + name)(socket, pub, sub, io, appRedisClient);
                });
            }
        };

        pub = redisService.createClient(false, conCallback);
        sub = redisService.createClient(false, conCallback);
    });
}
