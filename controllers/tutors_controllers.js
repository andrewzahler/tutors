var express = require("express");

var router = express.Router();

var db = require("../models");


//----home page route--------------------//
router.get('/', function(req, res, next){
  res.render('index')
});
//----home page route--------------------//


//----login route--------------------//
router.get('/login:id', function(req, res, next){
  res.render('login', {output: req.params.id});
});
//----login route--------------------//



//----register routes--------------------//
router.get('/register', function(req, res, next){
  res.render('register');
 });

router.get('/register', function(req, res, next){
  res.render('register');
 });
router.post('/register', function(req, res, next){
  var item = {
    student:req.body.value,//or would it be the name? req.body.student follwed by req.body.tutor???
    tid:req.body.id,
    tname:req.body.tname,
    tphone:req.body.tphone,
    taddress:req.body.taddress,
    temail:req.body.email,
    tsubject:req.body.tsubject
  };      
  res.redirect('/');
});
//----register routes--------------------//



//----schedule route--------------------//
router.get('/schedule', function(req, res, next){
  res.render('schedule')
});
//----schedule route--------------------//




//----students route--------------------//
router.get('/students', function(req, res, next){
  res.render('students')
});
//----students route--------------------//




//----tutors route--------------------//
router.get('/tutors', function(req, res, next){
  res.render('tutors')
});
//----tutors route--------------------//





module.exports = router;