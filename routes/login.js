var express = require('express');
var router = express.Router();
var database = require('./db');
const util = require('util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  database('localhost', 'precise', function(err, db) {
    if (err) throw err; console.log(req);
    db.models.user.find({email:req.query.email,password:req.query.password}, function(err, rows) {
      if (err) throw err;
      if (rows.length>0) {res.json({st:"ok"});} 
        else {res.json({st:"Error"});}      
    });
  });
});

/*
* POST to update user.
*/
router.post('/', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});


/*
* PUT to add user.
*/
router.put('/', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});


/*
* DELETE to remove user.
*/
router.delete('/', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

module.exports = router;
