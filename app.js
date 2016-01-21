var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/parkdash';
var ObjectId = require('mongodb').ObjectId;

var db;
 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

MongoClient.connect(mongoUrl, function(err, database){
  if(err){
    console.log(err);
  }
  console.log('connected');
  db = database;
  process.on("exit", db.close); 
});

app.get('/', function(req,res){
  res.render('index')
});


app.get('/parks', function(req,res){
  db.collection('parks').find({}).toArray(function(err, result){
      res.json(result);
    });
});


// app.get('/:name', function(req, res){
//   db.collection('parks').findOne({name: req.params.name},function(err,result){
//     res.json(result);
//   })
// });



app.listen(process.env.PORT || 9292);











