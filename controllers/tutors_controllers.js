var express = require("express");
var passport = require("passport");

var router = express.Router();
var db = require("../models");
var passData = require("../config/passport/passport.js");


//----home page route--------------------//
router.get('/', function(req, res) {
    res.render('index');
});
//----home page route--------------------//


//----register and login routes--------------------//


router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/student',
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



//----schedule routes --------------------//
// HTML route to render scheduling page
router.get("/schedule", isLoggedIn, function(req, res) {
    db.User.findOne(
        {
            where: {
                id: req.user.id
            }
        }
        ).then(function(dbUser) {
        var hbsObject = {
            user: dbUser
        };
        console.log(hbsObject);
        res.render("schedule", hbsObject);
    });
});

// router.get("/schedule", isLoggedIn, function(req, res) {
//     console.log(req.user.id);
//     res.render('schedule');
// });

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



//----tutors route--------------------//

router.get('/tutors', function(req, res, next) {
    res.render('tutors', req.body);
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
