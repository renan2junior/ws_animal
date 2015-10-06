module.exports = function(app) {
	var controller = app.controllers.video;

	app.route('/videos')
		.get(controller.listaVideos)
		.post(controller.salvaVideo);

	app.route('/videos/:id')
		.get(controller.obtemVideo);

};