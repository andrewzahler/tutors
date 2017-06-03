var express = require("express");
var router = express.Router();
var db = require("../models");


//----home page route--------------------//
router.get('/', function(req, res, next) {
  res.render('index');
});
//----home page route--------------------//



//----login route--------------------//
router.get('/login', function(req, res, next) {
  res.render('login', { output: req.params.id });
});
//----login route--------------------//



//----register routes--------------------//
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.post('/register', function(req, res, next) {
  console.log("username here", req.body.name)
  db.User.create(req.body).then(function(dbUser) {
    console.log("creating the user", user)
    var user = {
      type:req.body.value,
      id: req.body.id,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      subject: req.body.subjects
    };

    if (req.body.uType == 1) {
      console.log('create student');
      db.Student.create(user).then(function(req,res,next){
        console.log("new student body here", req.body);
        //              res.redirect('/student/');
      });                            
      //     /*
      //      *          * create the student - if sequelize is succesful:
      //      *          * redirect to student page
      //      *          * else 
      //      *          * redirect to error page
      //      *          */

    } else {
      console.log('create tutor');
      db.Tutor.create(user).then(function(req,res,next){
        res.redirect('/tutor/');
      });                             
    }
    console.log('USER: ' + JSON.stringify(user));
    //    res.redirect('/');
  });
  
});


router.get('/tutor/:id', function(req, res) {
  /*  get tutor with id  from database find()*/
  //    var user = orm.getTutor(id);
  db.Tutors.findbyId({
    where: {
      id: req.params.id
    },
    include: [db.Tutor]
  }).then(function(dbTutor) {
    res.json(dbTutor);console.log("Tutor by ID HERE: ",dbTutor);
  }); 
  res.render('tutors', {  });
});

router.get('/student/:id', function(req, res) {
  /* get tutor with id */
  //   var user = orm.getStudent(id);
  db.Students.findbyId({
    where: {
      id: req.params.id
    },
    include: [db.Student]
  }).then(function(dbStudent) {
    res.json(dbStudent);console.log("Student by ID HERE: ",dbStudent);
  });
  res.render('students', {  });
});
// ----register routes--------------------//







//----schedule route--------------------//
// HTML route to render scheduling page
router.get('/schedule', function(req, res, next) {
  res.render('schedule');
});

// API post route to create a new appointment
router.post('/api/appointments', function(req, res, next) { // what does the 'next' argument do?
  db.Appointment.create(req.body).then(function(dbAppointment) {
    // sequelize throws error saying I can't add a foreign key value if I try to supply one
    res.json(dbAppointment);
    // res.render("/");
  });
  console.log(req.body);
});



// API get route to find all appointments with left outer join including three models
router.get("/api/appointments", function(req, res) {
  db.Appointment.findAll({
    include: [db.Subject, db.Student, db.Tutor]
  }).then(function(dbAppointment) {
    res.json(dbAppointment);
  });
});

// API Get route for retrieving a single appointment
router.get("/api/appointments/:id", function(req, res) {
  db.Appointment.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Subject, db.Student, db.Tutor]
  }).then(function(dbAppointment) {
    res.json(dbAppointment);
  }); 
});

// API put route for updating appointments
router.put("/api/appointments", function(req, res) {
  db.Appointment.update(
    req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbAppointment) {
    res.json(dbAppointment);
  });
});

//----schedule route--------------------//




//----students route--------------------//
router.get('/students', function(req, res, next) {
  res.render('students');
});
//----students route--------------------//




//----tutors route--------------------//
router.get('/tutors', function(req, res, next) {
  
  res.render('tutors', req.body);
});
//----tutors route--------------------//





module.exports = router;





























