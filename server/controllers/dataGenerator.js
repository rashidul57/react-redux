var express = require('express'),
	router = express.Router(),
    async = require('async'),
    _ = require('lodash');

router.get('/', function (req, res, next) {
	try {

		const query = req.query;
		
		console.log(req.query);
		res.json({success: true});
        // const table = req.query.table;
		// const  sessionUser = req.session.user;
        // const query = {company: sessionUser.company._id};
		// if (table) {
		// 	query.table = table;
		// }
        // reportService
		// 	.find(query, sessionUser)
		// 	.then(tables => {
		// 		res.json(tables);
		// 	})
		// 	.catch(err => {
		// 		errorLogger.logServerError(err, req.session.user);
		// 		next(err);
		// 	});
	}
	catch (err) {
		next(err);
	}
});

//export router object
module.exports = router;
