var express = require("express");
var passport = require("passport");

var router = express.Router();

var db = require("../models");


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

router.post('/register', passport.authenticate('local-signup', {

    successRedirect: '/',
    failureRedirect: '/register'
}));

router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

router.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/schedule',
        failureRedirect: '/login' }
));



// router.post('/register', function(req, res, next) {
//     var user = {
//         //type:req.body.value,//or would it be the name? req.body.student follwed by req.body.tutor???
//         tid: req.body.id,
//         tname: req.body.tname,
//         tphone: req.body.tphone,
//         taddress: req.body.taddress,
//         temail: req.body.email,
//         tsubject: req.body.subjects
//     };

//     console.log(req.body);
//     console.log(req);

//     if (req.body.uType == 1) { // student
//         console.log('create student');

//          * create the student - if sequelize is succesful:
//          * redirect to student pagecd
//          * else 
//          * redirect to error page

//         //res.redirect('/student/:id');
//     } else {
//         console.log('create tutor');
//         //res.redirect('/tutor/:id');
//     }
//     console.log('USER: ' + JSON.stringify(User));
//     res.redirect('/');
// });

// router.get('/tutor/:id', function(req, res) {
//     /* get tutor with id */
//     var user = orm.getTutor(id);
//     res.render('user.handlebars', { istutor: true, user: user });
// });

// router.get('/student/:id', function(req, res) {
//     /* get tutor with id */
//     var user = orm.getStudent(id);
//     res.render('user.handlebars', { istutor: false, user: user });
// });
//----login and register routes--------------------//



//----schedule routes --------------------//
// HTML route to render scheduling page
router.get("/schedule", isLoggedIn, function(req, res) {
    res.render('schedule');
});

// API post route to create a new appointment
router.post("/api/appointments", function(req, res) { // what does the' argument do?
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
router.get('/tutors', function(req, res) {
    res.render('tutors');
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
