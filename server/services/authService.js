
module.exports = {
    validateSession: function (req, res, next) {
        if (req.session && req.session.user) {
            next();
        } else {
            next({message: 'Invalid session, please login and retry', status: 401});
        }
    }
}
