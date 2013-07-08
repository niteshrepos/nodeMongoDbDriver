
var mongo = require("mongodb");


var server = new mongo.Server("localhost", 27017);
var db = new mongo.Db("boom", server);
var BSON = mongo.BSONPure;

exports.insert = function(req, res){
		var record = req.body
		
		db.collection("try", function(err, collection){
			collection.insert(record)
		})	
		res.send(200)
}

exports.getAll = function(req, res){
		var records = [];
		db.collection("try", function(err, collection){
			collection.find({}, function(err, record){
				record.toArray(function(err, doc){
					console.log("1");
					res.send(doc)
				})
			})
		})	

	}	


exports.getById = function(req, res){
		var id = new BSON.ObjectID(req.params.id);
		db.collection("try", function(err, collection){
			collection.findOne({"_id": id}, function(err, rec){
				console.log(rec);
				res.send(rec)
				
			});
		})
	}

exports.update = function(req, res){
		var id = new BSON.ObjectID(req.params.id);
		var newObject = req.body;

		db.collection("try", function(err, collection){
			collection.update({"_id": id}, newObject, function(err, rec){
				console.log(rec);
				res.send(200)
			})
		})
		
	}

exports.delete = function(req, res){
		var id = new BSON.ObjectID(req.params.id);

		db.collection("try", function(err, collection){
			collection.remove({"_id": id}, function(err, rec){
				console.log(rec);
				res.send(200)
			})
		})
		
	}		