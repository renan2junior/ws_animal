var mongoose = require('mongoose');
var autoIncVideo = require('mongoose-auto-increment');

module.exports = function() {

	autoIncVideo.initialize(mongoose);

	var schema = mongoose.Schema({

		titulo: {
			type: String,
			require : true,
		},
		
		urlImagem: {
			type: String,
			
		},
		
		urlVideo: {
			type: String,
			
		},

	});

	schema.plugin(autoIncPet.plugin,{
		model : 'Video',
		field : 'idvideo',
		startAt : 1,
		increment : 1
	});

	return mongoose.model('Video', schema);

};