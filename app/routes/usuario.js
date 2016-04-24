module.exports = function(app) {
	var controller = app.controllers.usuario;

	app.route('/usuarios')
		.get(controller.listaUsuarios)
		.post(controller.salvaUsuario);

	app.route('/usuarios/:id')
		.get(controller.obtemUsuario);

};