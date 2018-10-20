const express = require('express'),
	router = express.Router(),
	async = require('async'),
	_ = require('lodash'),
	bbbScrapper = require('../services/scrappers/bbb'),
	reoindustryScrapper = require('../services/scrappers/reoindustry');

router.get('/', function (req, res, next) {
	try {
		const sessionUser = req.session.user;
		const query = req.query;
		res.json({success: true});

		switch (query.site) {
			case 'bbb':
			bbbScrapper.scrapeSite(query, sessionUser);
			break;

			case 'reoindustry':
			reoindustryScrapper.scrapeSite(query, sessionUser);
			break;
		}
	}
	catch (err) {
		next(err);
	}
});

//export router object
module.exports = router;
