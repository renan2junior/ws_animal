var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var _idProcurado = new ObjectID("54e3b4e9362c27cfeecc86d6");

MongoClient.connect('mongodb://127.0.0.1:27017/pet',
	function(erro, db) {
		if (erro) throw erro;
		db.collection('contatos').findOne({ _id : _idProcurado },
			function(erro, contato) {
				if (erro) throw erro;
				console.log(contato);
			}
		);
	}
);