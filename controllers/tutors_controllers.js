var express = require("express");

var router = express.Router();

var db = require("../models");


router.get('/index', function(req, res, next){
	// db.Student.findAll({

 //    }).then(function(dbStudent) {
 //      // console.log(dbBurger);
 //      // var burgers = dbBurger[0].dataValues;
 //      // console.log(burgers);
 //      var hbsObject = {
 //      students: dbStudent
 //    };
 //    console.log(hbsObject);
 //    res.render("index", hbsObject);
 //      // res.json(dbBurger);
 //    });
	res.render('index');
});

router.get('/students', function(req, res, next){

	res.render('students');
});


router.get('/register', function(req, res, next){
  res.render('register')});


router.get('/tutors', function(req, res, next){
  res.render('tutors')});






module.exports = router;