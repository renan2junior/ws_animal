module.exports = function(app) {
	var controller = app.controllers.pet;

	app.route('/pets')
		.get(controller.listaPets)
		.post(controller.salvaPet);

	app.route('/pets/:id')
		.get(controller.obtemPet)
		.delete(controller.removePet);
	
	app.route('/pets/tipo/:tipo')
		.get(controller.obtemPetPorTipo);

};
