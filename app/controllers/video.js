var sanitize = require('mongo-sanitize');

module.exports = function(app) {
	
	var Video = app.models.video;
	var controller = {};

	controller.listaVideos = function(req, res) {
		
		Video.find()
			.exec()
			.then(
				function(videos) {
					res.json(videos);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
			);
		
	};
	
	controller.obtemVideo = function(req, res) {

		var id = sanitize(req.params.id);
		
		Video.findOne({ "idvideo": id }).exec()
			.then(
				function(video) {
					if (!video) {
						res.json({}); 
					} else {
						res.json(video);	
					}
				},
				function(erro) {
					console.log(erro);
					res.status(404).json(erro);
				}
			);

	};
	
	
	controller.salvaVideo = function(req, res) {
		
		var id = sanitize(req.body.idvideo);
		var titulo = sanitize(req.body.titulo);
		
		if(id) {
			
			Video.findOneAndUpdate({ "idvideo": id }, req.body).exec()
				.then(
					function(video) {
						console.log(video);
						if (video) {
							res.json(video);
						} else {
							res.send('Video nao encontrado!');
						}
						
					},
					function(erro) {
						console.error(erro);
						res.status(500).json(erro);
					}
				);
			
		} else if(titulo) {
			
				Video.create(req.body)
					.then(
					function(video) {
								res.status(201).json(video);
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
