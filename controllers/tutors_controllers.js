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
router.post('/register', function(req, res, next){
  var User = {
    type:req.body.value,//or would it be the name? req.body.student follwed by req.body.tutor???
    tid:req.body.id,
    tname:req.body.tname,
    tphone:req.body.tphone,
    taddress:req.body.taddress,
    temail:req.body.email,
    tsubject:req.body.subjects
  };

  console.log(req.body);
  console.log(req);

  if(req.body.uType == 1){ // student
    console.log('create student');
    /*
     * create the student - if sequelize is succesful:
     * redirect to student page
     * else 
     * redirect to error page
     */
    //res.redirect('/student/:id');
  } else {
    console.log('create tutor');
    //res.redirect('/tutor/:id');
  }
  console.log('USER: ' + JSON.stringify(User));
  res.redirect('/');
});
router.post('/register', function(req, res, next){
  var User = {
    type:req.body.value,//or would it be the name? req.body.student follwed by req.body.tutor???
    tid:req.body.id,
    tname:req.body.tname,
    tphone:req.body.tphone,
    taddress:req.body.taddress,
    temail:req.body.email,
    tsubject:req.body.subjects
  };

  console.log(req.body);
  console.log(req);

  if(req.body.uType == 1){ // student
    console.log('create student');
    /*
     * create the student - if sequelize is succesful:
     * redirect to student page
     * else 
     * redirect to error page
     */
    //res.redirect('/student/:id');
  } else {
    console.log('create tutor');
    //res.redirect('/tutor/:id');
  }
  console.log('USER: ' + JSON.stringify(User));
  res.redirect('/');
});

router.get('/tutor/:id', function(req, res){
  /* get tutor with id */
  var user = orm.getTutor(id);
  res.render('user.handlebars', {istutor: true, user: user});
});

router.get('/student/:id', function(req, res){
  /* get tutor with id */
  var user = orm.getStudent(id);
  res.render('user.handlebars', {istutor: false, user: user});
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
