var express = require("express");
var passport = require("passport");

var router = express.Router();
var db = require("../models");
var passData = require("../config/passport/passport.js");



router.get('/index', function(req, res, next) {
    db.Student.findAll({

    }).then(function(dbStudent) {
        // console.log(dbBurger);
        // var burgers = dbBurger[0].dataValues;
        // console.log(burgers);
        var hbsObject = {
            students: dbStudent
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
        // res.json(dbBurger);
    });
    // res.render('index');
});



//----home page route--------------------//
router.get('/', function(req, res) {
    res.render('index');
});

//----register and login routes--------------------//

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/register'
}));


router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});


router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/schedule',
    failureRedirect: '/login'
}));


//----login and register routes--------------------//


//---- profile routes -----//

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile');
});

router.post('/profile', function(req, res) {
    var userData = {
        uType: req.body.uType,
        name: req.body.name,
        username: req.body.username,
        phone: req.body.phone,
        address: req.body.address,
        UserId: req.user.id
    };
    console.log("This is the userData object", userData);
    if (req.body.uType == 1) {
        db.Student.create(userData).then(function(dbStudent) {
            res.redirect('/students');
        });
    } else {
        userData.subjects = req.body.subjects;
        db.Tutor.create(userData).then(function(dbTutor) {
            res.redirect('/tutors');
        });
    }
});

//---- profile routes -----//


//----schedule routes --------------------//
// HTML route to render scheduling page

router.get('/schedule', function(req, res, next) {
    db.Tutor.findAll({

    }).then(function(dbTutor) {
        // console.log(dbBurger);
        // var burgers = dbBurger[0].dataValues;
        // console.log(burgers);
        var hbsObject = {
            Tutors: dbTutor
        };
        console.log(hbsObject);
        res.render("schedule", hbsObject);
        // res.json(dbBurger);
    });
    // res.render('schedule');

});
// API post route to create a new appointment
router.post("/api/appointments", function(req, res) { // what does the' argument do?
    db.Appointment.create(req.body).then(function(dbAppointment) {

        res.json(dbAppointment);
        // res.render("/");
    });
    console.log(req.body);
});

// API get route to find all appointments with left outer join including three models
router.get("/api/appointments", function(req, res) {
    db.Appointment.findAll({
        include: [db.Student, db.Tutor]
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
        include: [db.Student, db.Tutor]
    }).then(function(dbAppointment) {
        res.json(dbAppointment);
    });
});

//----schedule route--------------------//



//----students route--------------------//

router.get('/students', function(req, res) {

    res.render('students');
});
//----students route--------------------//
//get all students
router.get('/api/students', function(req, res, next) {
    db.Student.findAll(
        // include: [db.Post]
    ).then(function(dbStudent) {
        res.json(dbStudent);
    });
});
//get students by id
router.get('/api/students/:id', function(req, res, next) {
    db.Student.findAll({
        where: {
            id: req.params.id
        }
        // include: [db.Post]
    }).then(function(dbStudent) {
        res.json(dbStudent);
    });
});




//----tutors route--------------------//

router.get('/tutors', function(req, res, next) {
    res.render('tutors', req.body);
});

//----tutors route--------------------//
router.get('/api/tutors', function(req, res, next) {
    db.Tutor.findAll(
        // include: [db.Post]
    ).then(function(dbTutor) {
        res.json(dbTutor);
    });
});

//get tutors by id
router.get('/api/tutors/:id', function(req, res, next) {
    db.Tutor.findAll({
        where: {
            id: req.params.id
        }
    }).then(function(dbTutor) {
        res.json(dbTutor);
    });
});


// API Get route for retrieving all tutors for given subject to populate dropdown on scheduling page
router.get("/api/tutors/:subject", function(req, res) {
    db.Tutor.findAll({
        where: {
            subject: req.params.subject
        },
    }).then(function(dbSubjectTutors) {
        var hbsObject = {
            tutors: dbSubjectTutors
        };
        res.render("schedule", hbsObject);
    });
});

//----tutors route--------------------//


//--- login helper function --------------//
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
//--- login helper function --------------//

module.exports = router;