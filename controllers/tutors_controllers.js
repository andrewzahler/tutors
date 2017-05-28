var express = require("express");

var router = express.Router();

var db = require("../models");





router.get('/register', function(req, res, next){
  res.render('register')});


router.get('/tutors', function(req, res, next){
  res.render('tutors')});






module.exports = router;