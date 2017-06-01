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
    var user = {
        //type:req.body.value,//or would it be the name? req.body.student follwed by req.body.tutor???
        tid: req.body.id,
        tname: req.body.tname,
        tphone: req.body.tphone,
        taddress: req.body.taddress,
        temail: req.body.email,
        tsubject: req.body.subjects
    };

    console.log(req.body);
    console.log(req);

    if (req.body.uType == 1) { // student
        console.log('create student');
        /*
         * create the student - if sequelize is succesful:
         * redirect to student pagecd
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

router.get('/tutor/:id', function(req, res) {
    /* get tutor with id */
    var user = orm.getTutor(id);
    res.render('user.handlebars', { istutor: true, user: user });
});

router.get('/student/:id', function(req, res) {
    /* get tutor with id */
    var user = orm.getStudent(id);
    res.render('user.handlebars', { istutor: false, user: user });
});
//----register routes--------------------//



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
    res.render('tutors');
});
//----tutors route--------------------//





module.exports = router;
