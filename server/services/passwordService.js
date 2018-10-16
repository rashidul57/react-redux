/**
 * Created by sajibsarkar on 7/31/16.
 */

'use strict';


var bcrypt = require('bcryptjs');


/***
 * Encrypt Password service
 * @param password
 * @returns {Promise}
 */
 function encryptPassword (password) {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
	})
}


/***
 * Password Compararer
 * @param password1
 * @param password2
 * @returns {Promise}
 */
 function comparePassword (password1, password2) {
 	return new Promise((resolve, reject) => {
		bcrypt.compare(password1, password2, function (err, res) {
		    if (err) {
		        console.log(err);
		    }
			if (err || !res) {
				reject({matched: false});
			} else {
				resolve({matched: true});
			}
		});
	});
 }


module.exports.encryptPassword = encryptPassword;


module.exports.comparePassword = comparePassword;
