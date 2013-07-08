
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var mongo = require("mongodb");


var server = new mongo.Server("localhost", 27017);
var db = new mongo.Db("boom", server);
var BSON = mongo.BSONPure;

db.open(function(err){
	console.log("connected");



	app.post('/users', function(req, res){
		var record = req.body
		
		db.collection("try", function(err, collection){
			collection.insert(record)
		})	
		res.send(200)
	});


	app.get('/users', function(req, res){
		var records = [];
		db.collection("try", function(err, collection){
			collection.find({}, function(err, record){
				record.toArray(function(err, doc){
					console.log("1");
					res.send(doc)
				})
			})
		})	
	});

	app.get("/users/:id", function(req, res){
		var id = new BSON.ObjectID(req.params.id);
		db.collection("try", function(err, collection){
			collection.findOne({"_id": id}, function(err, rec){
				console.log(rec);
				res.send(rec)
				
			});
		})
	})

	app.put("/users/:id", function(req, res){
		var id = new BSON.ObjectID(req.params.id);
		var newObject = req.body;

		db.collection("try", function(err, collection){
			collection.update({"_id": id}, newObject, function(err, rec){
				console.log(rec);
				res.send(200)
			})
		})
		
	})

	app.delete("/users/:id", function(req, res){
		var id = new BSON.ObjectID(req.params.id);

		db.collection("try", function(err, collection){
			collection.remove({"_id": id}, function(err, rec){
				console.log(rec);
				res.send(200)
			})
		})
		
	})
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
