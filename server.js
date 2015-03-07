var http = require('http');
var express = require('express');
var app = require('./config/express')(app);
require('./config/database')('mongodb://localhost/pet');

http.createServer(app).listen(app.get('port'), function() {
	
	console.log('Express Server escutando na porta ' + app.get('port'));

});
