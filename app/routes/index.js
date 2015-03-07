module.exports = function(app) {

	app.get('/', function(req, res) {

		//res.render('index', { "usuarioLogado" : 'bruno' });
		res.render('index');

	});

};