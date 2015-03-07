var mongoose = require('mongoose');
var autoIncPet = require('mongoose-auto-increment');

module.exports = function() {
	
	autoIncPet.initialize(mongoose);
	
	var schema = mongoose.Schema({
		
		pet_nome: {
			type: String,
			require : true,
		},
		
		pet_sexo: {
			type: String,
			
		},
		
		pet_idade: {
			type: String,
			
		},
		
		pet_descricao: {
			type: String,
			
		},
		
		pet_tipo_dade: {
			type: String,
			
		},
		
		pet_porte: {
			type: String,
			
		},
		
		pet_raca: {
			type: String,
			
		},
		
		pet_tipo: {
			type: String,
			
		},
		
		pet_status: {
			type: String,
			
		},

	});
	
	schema.plugin(autoIncPet.plugin,{
		model : 'Pet',
		field : 'idpet',
		startAt : 1,
		increment : 1
	});
	
	return mongoose.model('Pet', schema);

};