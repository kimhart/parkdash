var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/parkdash';
var ObjectId = require('mongodb').ObjectId;
var ig = require('instagram-node').instagram();

var db;
 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
ig.use({ access_token: 'YOUR_ACCESS_TOKEN' });
ig.use({ client_id: 'YOUR_CLIENT_ID',
         client_secret: 'YOUR_CLIENT_SECRET' });



MongoClient.connect(mongoUrl, function(err, database){
  if(err){
    console.log(err);
  }
  db = database;
  process.on("exit", db.close); 
});

app.get('/', function(req,res){
   db.collection('parks').find({}).toArray(function(err, result){
     res.render('index', {parks: result})
  })
});

app.get('/parks/:name', function(req,res){
  res.render('show_park', {parkName: req.params.name});
})

app.get('/api/parks', function(req,res){
   db.collection('parks').find({}).toArray(function(err, result){
     res.json(result)
  })
});

app.get('/api/:name', function(req,res){
  db.collection('parks').findOne({name: req.params.name}, function(err, result){
     console.log(result)
     res.json(result);
    });
});







app.listen(process.env.PORT || 9292);











