var sanitize = require('mongo-sanitize');

module.exports = function(app) {
	
	var Pet = app.models.pet;
	var Usuario = app.models.usuario;
	var controller = {};

	controller.listaPets = function(req, res) {
		
		Pet.find()
			.exec()
			.then(
				function(pets) {
					res.json(pets);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
			);
		
	};
	
	controller.listaPetsPorUsuario = function(req, res) {
		
		var idusuario = sanitize(req.params.id);
		var idpets = [];
		
		Usuario.findOne({ "idusuario": idusuario })
			.exec()
			.then(
				function (usuario) {
					console.log("Retorna usuario" + usuario);
					idpets = usuario.pets;
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}	
			);
		
		console.log("Busca pets" + idpets);
		
		Pet.find({ "_id": { $in: idpets } })
			.exec()
			.then(
				function(pets) {
					console.log("Retorna pets" + pets);
					res.json(pets);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
			);
		
	};
	
	controller.obtemPet = function(req, res) {

		var id = sanitize(req.params.id);
		
		Pet.findOne({ "idpet": id }).exec()
			.then(
				function(pet) {
					if (!pet) {
						res.json({}); 
					} else {
						res.json(pet);	
					}
				},
				function(erro) {
					console.log(erro);
					res.status(404).json(erro);
				}
			);

	};
	
	controller.obtemPetPorTipo = function(req, res) {
		
		var tipo = sanitize(req.params.tipo);
		
		Pet.find({ "pet_tipo": tipo })
			.exec()
			.then(
				function(pets) {
					res.json(pets);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
			);
		
	};
	
	controller.removePet = function(req, res) {
		
		var id =  sanitize(req.params.id);

		Pet.remove({ "idpet": id }).exec()
			.then(
				function() {
					res.send('Removido com sucesso!');
				},
				function(erro) {
					return console.error(erro);
				}
			);
		
	};
	
	controller.salvaPet = function(req, res) {
		
		/*var dados = {
			"pet_nome" : req.body.pet_nome,
			"pet_sexo" : req.body.pet_sexo,
			"pet_idade" :req.body.pet_idade,
			"pet_descricao" : req.body.pet_descricao,
			"pet_tipo_dade" : req.body.pet_tipo_dade,
			"pet_porte" : req.body.pet_porte,
			"pet_raca" : req.body.pet_raca,
			"pet_tipo" : req.body.pet_tipo,
			"pet_status" : req.body.pet_status
		};*/
		
		var id = sanitize(req.body.idpet);
		var pet_nome = sanitize(req.body.pet_nome);
		
		if(id) {
			
			Pet.findOneAndUpdate({ "idpet": id }, req.body).exec()
				.then(
					function(pet) {
						console.log(pet);
						if (pet) {
							res.json(pet);
						} else {
							res.send('Pet nao encontrado!');
						}
						
					},
					function(erro) {
						console.error(erro);
						res.status(500).json(erro);
					}
				);
			
		} else if(pet_nome) {
			
				Pet.create(req.body)
					.then(
					function(pet) {
								res.status(201).json(pet);
							},
							function(erro) {
								console.log(erro);
								res.status(500).json(erro);
							}
					);
				
		} else {
			res.status(500).json("Informe os dados para cadastro!");
		}
		
	};

	return controller;
	
};
