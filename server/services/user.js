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

    updateUser: function(sessionUser, userData) {
        var me = this;
        return new Promise(function(resolve, reject) {
            User.findOne({ _id: userData._id }).populate('company').populate('location').exec().then(foundUser => {
                if (foundUser) {
                    const originalUserData = foundUser.toJSON();

                    checkEmail(userData, foundUser, function(err, isValidEmail) {
                        if (isValidEmail) {
                            if (sessionUser && sessionUser._id) {
                                if (foundUser._id.toString() !== sessionUser._id && !sessionUser.admin) {
                                    return reject({ message: "Only Admin can edit other user's profile." });
                                }

                                if (!sessionUser.super && (foundUser.admin !== userData.admin || foundUser.mAccess !== userData.mAccess)) {
                                    return reject({ message: "Only Super user can change admin and mAccess properties." });
                                }
                            } else if (_.indexOf(process.argv, 'clean') === -1) {
                                return reject({ message: "Only Admin/Super user can edit users." });
                            }

                            //password change isn't allowed with update api
                            delete userData.password;
                            _.keys(userData).forEach(function(key) {
                                if (_.includes(editableFields, key) && userData[key] !== undefined) {
                                    foundUser.set(key, userData[key]);
                                }
                            });

                            foundUser.set("serviceProvider", userData.identity !== "Investor" ? true : false);
                            foundUser.save().then(savedData => {
                                    var baseCmd = User.findOne({ _id: savedData._id });
                                    populateUserDetail(baseCmd)
                                        .lean().exec().then(updatedUser => {
                                            userData._id = updatedUser._id;
                                            addRemoveContact(userData, sessionUser, 'add').then(() => {
                                                broadcastToUser(sessionUser, updatedUser);
                                                activityLogService.addActivityLogForUpdateItem('User', originalUserData, updatedUser, sessionUser);
                                                resolve(updatedUser);
                                            }).catch(err => { reject(err); });
                                        })
                                        .catch(err => { reject(err); });
                                })
                                .catch(err => { reject(err); });
                        } else {
                            reject({ message: "Email is not available as there is already an user with same email." });
                        }
                    });
                } else {
                    reject({ message: "User not found in the system" });
                }
            }).catch(err => { reject(err); });
        });
    },
    changePassword: function(sessionUser, userData) {
        return new Promise(function(resolve, reject) {
            User.findOne({ email: sessionUser.email }).select('password').exec().then(user => {
                    passwordService.comparePassword(userData.currentPassword, user.password)
                        .then(function(result) {
                            if (result.matched) {
                                passwordService.encryptPassword(userData.newPassword)
                                    .then(function(encPassword) {
                                        User.findOneAndUpdate({ "_id": sessionUser._id }, { "$set": { password: encPassword, passwordSet: true } }, { new: true })
                                            .exec().then(user => {
                                                resolve(user);
                                            }).catch(function(err) {
                                                reject(err);
                                            });
                                    })
                                    .catch(function(err) {
                                        console.log("password encryption error", err);
                                        reject(err);
                                    });
                            } else {
                                reject({ message: "Old Password didn't match." });
                            }
                        })
                        .catch(function(err) {
                            console.log("Current password comparison error", err);
                            reject(err);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    },
    broadcastToUser: broadcastToUser,
    generateRandomString: generateRandomString,
    getEncriptedPassword: getEncriptedPassword
};
