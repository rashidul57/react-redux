var _ = require('lodash');

module.exports = function (socket, pub, sub, io, appRedisClient) {
    var session = socket.request.session,
        sessionUser = session.user,
        companyIndependentEvents = ['category:reload', 'goal:reload', 'user:reload', 'conference:invite-received', 'company:reload', 'sharedResources:reload', 'sharedResources:invitation-received'];

    sub.on('message', function(channel, data) {
        data = JSON.parse(data);

        if (companyIndependentEvents.indexOf(channel) === -1) {
            //if message received from other company then discard it
            if (data.user && data.user.company && data.user.company._id && data.user.company._id.toString() !== sessionUser.company._id.toString()) {
                return;
            }
        }
        ///console.log(channel, 'fired for user', sessionUser.fullName);
        switch (channel) {
            case 'scraping-update':
                socket.emit(channel, data);
                break;
        }
    });


    //Register non-socket events(those will come from https requests specially
    //for which module that have less real time features)
    sub.subscribe('scraping-update');

};

