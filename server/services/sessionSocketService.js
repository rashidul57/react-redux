"use strict";

var _ = require('lodash'),
    util = require("util"),
    activeUserConnections = [],
    redisService = require('./redisService');

module.exports = {
    uptoDateMyConnectionStatus: function (user, newConnection, appRedisClient) {
        _.each(activeUserConnections, function (connectionInfo, index) {
            if (connectionInfo && (
                (newConnection && newConnection.sessionId === connectionInfo.sessionId) ||
                (!newConnection && connectionInfo.user._id.toString() === user._id.toString()) ) ) {
                console.log('Up to date session for user ', connectionInfo.user.fullName);
                connectionInfo.sub.unsubscribe();
                connectionInfo.sub.quit();
                connectionInfo.pub.quit();
                activeUserConnections.splice(index, 1);
            }
        });

        if (newConnection) {
            activeUserConnections.push(newConnection);
        }
        console.log('connection count', activeUserConnections.length);
    },

    getMyPublisher: function (sessionUser) {
        var conn = _.find(activeUserConnections, function (connectionInfo, index) {
            return (connectionInfo.user._id.toString() === sessionUser._id.toString());
        });
        return (conn ? conn.pub : {});
    },

    disconnectUser: function (user, pub, appRedisClient) {
        if (user) {
            console.log('Disconnecting user', user.fullName);
        }
        pub.publish('user:disconnected', JSON.stringify({user: user}));
        this.uptoDateMyConnectionStatus(user, null, appRedisClient);

    },
    cleanOldSessionFromStack: function (sessionKey) {
        _.each(activeUserConnections, function (connectionInfo, index) {
            if (connectionInfo && sessionKey.indexOf(connectionInfo.sessionId) > -1) {
                console.log('Removed Old Session', sessionKey, 'from stack for user', connectionInfo.user.fullName);

                //clean pub/sub
                if (connectionInfo.sub) {
                    connectionInfo.sub.unsubscribe();
                    connectionInfo.sub.quit();
                    connectionInfo.pub.quit();
                }

                //clean socket
                if (connectionInfo.socket) {
                    connectionInfo.socket.error("DUPLICATE_SESSION");
                    connectionInfo.socket.request.session.user = undefined;
                    connectionInfo.socket.request.session.destroy();
                    connectionInfo.socket.disconnect(true);
                }
                delete connectionInfo.socket;
                activeUserConnections.splice(index, 1);
            }
        });
    },

    getConnectionCount: function () {
        return activeUserConnections.length;
    },

    getUserConnections: function () {
        return activeUserConnections;
    },

    broadcastEvent: function (channel, params) {
        var userConnection = _.find(activeUserConnections, function (con) {
            return (con.user && con.user._id && params.user && params.user._id && con.user._id.toString() === params.user._id.toString());
        });

        if (userConnection || params.bypassSession) {
            setImmediate(function () {
                userConnection.pub.publish(channel, JSON.stringify(params));
            });
        } else {
            console.log('Failed to broadcast ', channel, ' probably user is not connected.');
        }
    },
	broadcastEventByUserId: function (channel, userId, params) {
		var userConnection = _.find(activeUserConnections, function (con) {
			return (con.user && con.user._id && userId &&  con.user._id.toString() === userId.toString());
		});

		if (userConnection) {
			setImmediate(function () {
				userConnection.pub.publish(channel, JSON.stringify(params));
			});
		} else {
			console.log('Failed to broadcast ', channel, ' probably user is not connected.');
		}
	},
    isSocketSessionValid: function (socket) {
        if (!socket.request.session || !socket.request.session.user) {
            socket.emit('socket:invalid-session', true);
            return false;
        } else {
            return true;
        }
    },
    relayProgress: function (data={}) {
        if (!data.event) {
            return console.log('socket event not provided');
        }
        // console.log('data', data);
        this.broadcastEvent(data.event, data);
    }

};
