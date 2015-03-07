var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var helmet = require('helmet');
//var home = require('../app/routes/home');

module.exports = function() {
    
    	var app = express();
	app.set('port', 3010); 
	app.use(express.static('./public'));   	
	app.set('view engine', 'ejs');
	app.set('views', './app/views');
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	app.use(cookieParser());
	app.use(session(
		{
			secret: 'homem avestruz',
			resave: true,
			saveUninitialized: true
		}
	));
	app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());

	//home(app);	
	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);

	return app;

};
