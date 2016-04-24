var sanitize = require('mongo-sanitize');

module.exports = function(app) {
	
	var Usuario = app.models.usuario;
	var controller = {};

	controller.listaUsuarios = function(req, res) {
		
		Usuario.find()
			.exec()
			.then(
				function(usuarios) {
					res.json(usuarios);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
			);
		
	};
	
	controller.obtemUsuario = function(req, res) {

		var id = sanitize(req.params.id);
		
		Usuario.findOne({ "idusuario": id }).exec()
			.then(
				function(usuario) {
					if (!usuario) {
						res.json({}); 
					} else {
						res.json(usuario);	
					}
				},
				function(erro) {
					console.log(erro);
					res.status(404).json(erro);
				}
			);

	};
	
	
	controller.salvaUsuario = function(req, res) {
		
		var id = sanitize(req.body.idusuario);
		var nome = sanitize(req.body.nome);
		
		if(id) {
			
			Usuario.findOneAndUpdate({ "idusuario": id }, req.body).exec()
				.then(
					function(usuario) {
						console.log(usuario);
						if (usuario) {
							res.json(usuario);
						} else {
							res.send('Usuario nao encontrado!');
						}
						
					},
					function(erro) {
						console.error(erro);
						res.status(500).json(erro);
					}
				);
			
		} else if(nome) {
			
				Usuario.create(req.body)
					.then(
					function(usuario) {
								res.status(201).json(usuario);
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
