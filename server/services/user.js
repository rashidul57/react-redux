'use strict';

var User = require('../models/user.js'),
    config = require('../config'),
    passwordService = require('./passwordService.js'),
    userService = require('./user.js'),
    sessionSocketService = require('./sessionSocketService'),
    _ = require('lodash');

const editableFields = ["name", "chatTag", "company", "email", "password", "identity", "firstName", "lastName", "phoneNumber", "location", "focus", "nationwide", "notes", "admin", "super", "mAccess", "role", "subRole", "collaborator", "twilioCallerId", "linkedInProfileLink"];

function sendUserDataAsDetail(user, next) {
    user.populate('company location', function(err1, newUser) {
        if (err1) {
            console.log(err1);
            next(err1);
        } else {
            next(null, newUser);
        }
    });
}

function generateRandomString(string_length) {
    return 'newyork952';
    /*var chars = "abcdefghikmnpqrstuvwxyz123456789",
        randomString = '';

    if (!string_length) {
        string_length = 8;
    }

    for (var i = 0; i < string_length; i++) {
        var rNum = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(rNum, rNum + 1);
    }

    return randomString;*/
}

function getEncriptedPassword(password) {
    return new Promise(function(resolve, reject) {
        if (!password) {
            password = generateRandomString(8);
        }
        passwordService.encryptPassword(password)
            .then(function(encPassword) {
                resolve(encPassword)
            })
            .catch(err => {
                reject({ message: 'Failed to encrypt the password' });
            });
    });
}

function populateUserDetail(baseCmd) {
    return baseCmd
        .populate('location')
        .populate({
            path: 'company',
            populate: [{
                path: 'locations',
                model: 'CompanyLocation'
            }, {
                path: 'contacts.user',
                model: 'User',
                select: 'email fullName company',
                populate: [{
                    path: 'company',
                    model: 'Company',
                    select: 'name url'
                }]
            }, {
                path: 'contacts.owner',
                model: 'User',
                select: 'email fullName company',
                populate: [{
                    path: 'company',
                    model: 'Company',
                    select: 'name logo'
                }]
            }, {
                path: 'logo',
                select: 'filename originalname'
            }]
        });
}

function checkEmail(userData, foundUser, callback) {
    if (userData.email.toLowerCase() === foundUser.email.toLowerCase()) {
        callback(null, true);
    } else {
        User.findOne({ email: userData.email.toLowerCase() }, function(err, user) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(null, !user);
        });
    }
}

function broadcastToUser(sessionUser, user) {
    if (sessionUser && sessionUser._id) {
        sessionSocketService.broadcastEvent('user:reload', { user: sessionUser, changedUser: user });
    }
}

function getNewPassword(user) {
    return new Promise(function(resolve, reject) {
        var password = generateRandomString(8);
        passwordService.encryptPassword(password)
            .then(function(encPassword) {
                var data = {
                    password: encPassword,
                    passwordSet: false
                };
                User.findOneAndUpdate({ "_id": user._id }, { "$set": data }, { new: true })
                    .exec().then(user => {
                        resolve({ user: user, password: password });
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(function(err) {
                console.log("password encryption error", err);
                reject({ message: "Password encryption failed" });
            });
    });
}


module.exports = {
    find: function(query) {
        return new Promise(function(resolve, reject) {
            var baseCmd = User.find(query);
            populateUserDetail(baseCmd)
                .lean()
                .exec()
                .then(users => {
                    resolve(users)
                })
                .catch(err => { reject(err); })
        });
    },
    findOne: function(query) {
        return new Promise(function(resolve, reject) {
            var baseCmd = User.findOne(query);
            populateUserDetail(baseCmd)
                .lean()
                .exec()
                .then(user => {
                    resolve(user)
                })
                .catch(err => { reject(err); })
        });
    },
    login: function(email, password) {
        return new Promise((resolve, reject) => {
            var userInfo = { loggedIn: false };
            var query = { email: email };
            this.getSessionUser(query).then(user => {
                if (user) {
                    if (!user.mAccess && !user.collaborator) {
                        return reject({ status: 400, message: "You are not authorized to login. Please contact sales@sentinellabs.io." });
                    }
                    passwordService.comparePassword(password, user.password).then(function(result) {
                        if (result.matched) {
                            user = _.omit(user, 'password');
                            userInfo = {
                                loggedIn: true,
                                user: user
                            };
                            resolve(userInfo);
                        } else {
                            userInfo.loginError = "Invalid User Name or Password";
                            reject({ status: 400, messgae: userInfo.loginError });
                        }
                    }).catch(ex => {
                        console.log("Password compare error ", ex);
                        userInfo.loginError = "Invalid User Name or Password";
                        reject({ status: 400, messgae: userInfo.loginError });
                    });

                } else {
                    userInfo.loginError = "Invalid User Name or Password";
                    reject({ status: 400, messgae: userInfo.loginError });
                }
            }).catch(err => {
                reject(err);
            });
        });
    },
    getSessionUser: function(query) {
        return new Promise((resolve, reject) => {
            var baseCmd = User.findOne(query).select('+password');
            populateUserDetail(baseCmd)
                .lean()
                .exec()
                .then(user => {
                    resolve(user);
                }).catch(err => {
                    if (err.message.toString().indexOf('Cast to ObjectId failed') > -1) {
                        err = { message: 'Invalid user id provided.' };
                    }
                    reject(err);
                });
        });
    },
    create: function(sessionUser, userData) {
        var me = this,
            password = userData.password;
        return new Promise(function(resolve, reject) {

            getEncriptedPassword(password).then(encPassword => {
                userData.password = encPassword;
                userData.serviceProvider = (userData.identity !== "Investor") ? true : false;
                User
                    .create(userData)
                    .then(newUser => {

                        // sending email to new user/contact is commented out
                        // sendNewUserEmail(newUser, sessionUser);

                        User.findOne({
                            _id: newUser._id
                        }).populate('company location').then(user => {
                            _.extend(user, userData);
                            if (!sessionUser) {
                                sessionUser = user;
                            }
                            resolve(user);
                        }).catch(err => {
                            reject(err);
                        });
                    })
                    .catch(err => {
                        reject(err);
                    });
            }).catch(err => { reject(err); });
        });
    },
    injectAdditionalProps: function(user) {
        if (user) {
            user.sessionTimeout = config.sessionTimeout;
        }
        return user;
    },

    broadcastToUser: broadcastToUser,
    generateRandomString: generateRandomString,
    getEncriptedPassword: getEncriptedPassword
};
