var mongoose = require('mongoose');
var autoIncUsuario = require('mongoose-auto-increment');

module.exports = function() {

	autoIncUsuario.initialize(mongoose);

	var schema = mongoose.Schema({

		nome: {
			type: String,
			require : true,
		},
		
		telFixo: {
			type: String,
			
		},
		
		celular: {
			type: String,
			
		},
		
		email: {
			type: String,
			
		},
		
		endereco: {
			type: String,
			require : true,
		},
		
		pets: [
			{
				type: mongoose.Schema.Types.ObjectId, ref: 'Pet'
			}
		],

	});
	

	schema.plugin(autoIncUsuario.plugin,{
		model : 'Usuario',
		field : 'idusuario',
		startAt : 1,
		increment : 1
	});

	return mongoose.model('Usuario', schema);

};