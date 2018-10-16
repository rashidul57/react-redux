
'use strict';

require('./server/utils/ENV').loadEnvProperties();

var express              = require('express'),
    app                  = express();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
//Please keep this settings here as some module internally uses environment
app.set('env', process.env.ENV_NAME);

var _                    = require('lodash'),
    mongoConString       = process.env.MONGODB_CONNECTION_STRING,
    appPort              = process.env.APPLICATION_PORT,
    compress             = require('compression'),
    fs                   = require('fs'),
    privateKey           = fs.readFileSync('./ssl/private-key.pem'),
    certificate          = fs.readFileSync('./ssl/server.crt'),
    options              = { key: privateKey, cert: certificate },
    server               = require('https').Server(options, app),
    config               = require('./server/config'),
    bodyParser           = require('body-parser'),
    methodOverride       = require('method-override'),
    csrf                 = require("csurf"),
    morgan               = require('morgan'),
    expressSession       = require('express-session'),
    redisStore           = require('connect-redis')(expressSession),
    redisService         = require('./server/services/redisService'),
    redisClient          = redisService.createClient(true),
    mongoose             = require('mongoose'),
    io                   = require('socket.io')(server, {'pingInterval': config.sessionTimeout, 'pingTimeout': (config.sessionTimeout + 60000)}),
    controllers          = require('./server/controllers'),
    helmet               = require('helmet'),
    session;

// App Connection to db
mongoose.set('debug', false);

mongoose.Promise = Promise;

var options = {
	autoReconnect: true,
	poolSize: 10,
    keepAlive: config.sessionTimeout,
    useNewUrlParser: true
};

mongoose.connect(mongoConString, options).then(
	(connection) => {
		console.log('Mongoose connected!');

		process.on('SIGINT', function (err) {
			//1=connected, 2=connecting
			if (connection && (connection.readyState === 1 || connection.readyState === 2)) {
				connection.onClose(true);
			}
			if (redisClient.ready) {
				redisClient.quit();
			}
			process.exit();
		});
	},
	(error) => {
		console.log('Mongoose connection error ', error);
	}
);


session = expressSession({
    secret: "iliketurtle",
    saveUninitialized: false,
    resave: false,
    cookie: {secure: true},
    store: new redisStore({client: redisClient, ttl: config.sessionTimeout/1000})
});


// Express App Settings and middlewares
app.set('view engine', 'html');
//app.set('views', __dirname);
app.set('view options', { layout: false });
app.use(express.static(__dirname + '/build'));
app.use(compress());
app.use(session);
app.use(bodyParser.json({limit: '10mb', type:'application/json'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));

//app.set('trust proxy', 1);
app.use(function(req, res, next) {
	//TODO: specilize it only for mobile
	if (true) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	}

	csrf();
    if (req.csrfToken) {
        var token = req.csrfToken();
        res.cookie('XSRF-TOKEN', token);
    }
    return next();
});

//for security
app.use(helmet());
app.disable('x-powered-by');
app.disable('X-XSS-Protection');
app.disable('csp');


app.use(morgan('dev'));

// Socket.IO Session integration from express
// io.set('authorization', function(handshake, accept) {
//     session(handshake, {}, function (err) {
//         if (err) {
//             console.log('err', err);
//             accept(err);
//         } else {
//             var session = handshake.session;
//             // check if the session is valid
//             var isAuthorised = (session && session.user && session.user._id);
//             if (isAuthorised){
//                 accept(null, isAuthorised);
//             } else {
//                 accept('NOT_AUTHORISED');
//             }
//         }
//     });
// });

//Boot routes(along with controllers)
controllers.call(this, app);


app.get('/:route(|index|static/*)', handlePageRequest);

function handlePageRequest(req, res, next) {
    res.sendFile(__dirname + '/build/index.html');
}


app.get('*', function(req, res) {
    res.status(404);
    if (req.xhr){
		res.json({ message: 'Requested Resource  does not exists!'});
	} else {
		res.send("Requested URL does not exists!");
	}
});


/********** Server listening to specified port **************/
server.listen(appPort, function () {
    console.log("Server is listening on " + appPort);
});

module.exports = app;
