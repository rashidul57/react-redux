'use strict';

var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    authService = require('../services/authService'),
    userService = require('../services/user'),
    appUtil = require('../utils/appUtil'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId,
    async = require('async'),
    moment = require('moment'),
    fs = require('fs');


function createUser(name, data, company) {
    return new Promise((resolve, reject) => {
        var password = 'newyork952'; //Math.random().toString().replace('.', '').substr(1, 5);
        var userData = {
            firstName: name,
            lastName: name,
            chatTag: '@' + name,
            password: password,
            email: data.sponsorEmail,
            company: company._id,
            companyLocation: company.locations[0],
            isContact: true,
            mAccess: true
        };
        userService.create(undefined, userData).then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            });
    });
}


//GET ALL Users
router.get('/', authService.validateSession, function(req, res, next) {
    try {
        var sessionUser = req.session.user,
            query = {};
        if (!sessionUser.super) {
            query.company = sessionUser.company._id;
        }
        userService
            .find(query)
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                next(err);
            })
    } catch (err) {
        next(err);
    }
});

//GET User by ID
//router.get('/:id', authService.validateSession, function (req, res, next) {
router.get('/:id', function(req, res, next) {
    try {
        if (!req.params.id || req.params.id === 'undefined') {
            return next({ message: 'No ID provided for user.' });
        }
        userService
            .find({ _id: req.params.id })
            .then(users => {
                if (users.length) {
                    res.json(users[0]);
                } else {
                    res.json({ message: 'User not found.' });
                }
            })
            .catch(err => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
});

//Delete users (DELETE /users)
router.delete('/:id', authService.validateSession, function(req, res, next) {
    try {
        var sessionUser = req.session.user;

        userService
            .remove(sessionUser, req.params.id, req.query.type)
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                next(err);
            });

    } catch (err) {
        next(err);
    }
});

//GET User by Email
router.get('/byEmail/:email', authService.validateSession, function(req, res, next) {
    try {
        User
            .findOne({ email: req.params.email.toLowerCase() })
            .populate('company location')
            .exec()
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                next(err);
            })
    } catch (err) {
        next(err);
    }
});

router.post('/', function(req, res, next) {
    try {
        var userData = req.body,
            sessionUser = req.session.user;

        userService
            .create(sessionUser, userData)
            .then(newUser => {
                User
                    .findById(newUser._id)
                    .populate('company location')
                    .exec()
                    .then(newUser => {
                        res.json(newUser);
                    })
                    .catch(err => {
                        next(err);
                    });
            }).catch(err => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
});

//login user
router.post('/login', function(req, res, next) {
    try {
        var email = _.trim(req.body.email).toLowerCase();
        var password = req.body.password;
        password = appUtil.decryptToText(password);

        //happens in case of 'clean' mode when browser had a session
        if (!req.session) {
            return next({ message: 'Invalid browser state, please contact Sentinel Labs.' });
        }

        userService
            .login(email, password)
            .then(userInfo => {
                req.session.user = userInfo.user;

                res.json(userInfo);
            })
            .catch(err => {
                return next(err);
            });

    } catch (err) {
        next(err);
    }
});


/***
 * Users/id  PUT method
 */
router.put('/:id', authService.validateSession, function(req, res, next) {
    try {
        var sessionUser = req.session.user;
        var data = req.body;

        data.lastUpdatedBy = sessionUser._id;
        data.lastUpdated = new Date();

        if ((data.oldPassword && !data.newPassword) || (!data.oldPassword && data.newPassword)) {
            return next({ message: 'Please provide both old and new password' });
        }

        userService
            .updateUser(sessionUser, data)
            .then(updatedUser => {
                if (sessionUser._id.toString() === updatedUser._id.toString()) {
                    if (updatedUser.toJSON) {
                        updatedUser = updatedUser.toJSON();
                    }
                    updatedUser = _.omit(updatedUser, 'password');
                    updatedUser = userService.injectAdditionalProps(updatedUser);
                    req.session.user = updatedUser;
                }
                res.json(updatedUser);
            })
            .catch(err => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
});

router.post('/forgotPassword', function(req, res, next) {
    try {
        var data = req.body;

        if (!data.email) {
            return next({ message: 'Email is required to send password.' });
        }

        userService.forgotPassword(data, function(err) {
            if (err) {
                return next(err);
            }
            res.json({ success: true });
        });
    } catch (err) {
        next(err);
    }
});


router.get('/session/validateMe', function(req, res, next) {
    try {
        if (req.session && req.session.shadowLogin) {
            req.session.destroy();
            delete req.session;
        }
        var loggedIn = req.session ? (!!req.session.user) : false;
        var userInfo = {
            loggedIn: loggedIn
        };
        if (loggedIn) {
            userInfo.user = req.session.user;
        }
        res.json(userInfo);
    } catch (err) {
        errorLogger.logServerError(err);
        next(err);
    }
});


//export router object
module.exports = router;
