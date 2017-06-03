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

//** ROUTE REPLACED BY ABOVE; REMAINDER OF THIS FUNCTION MOVED TO PASSPORT.JS **//
// router.post('/register', function(req, res, next) {
//     console.log(req.body);
    // 
    // db.User.create(req.body).then(function(dbUser) {
    //     console.log("creating the user", user);
    //     var user = {
    //         type: req.body.value,
    //         id: req.body.id,
    //         name: req.body.name,
    //         phone: req.body.phone,
    //         address: req.body.address,
    //         email: req.body.email,
    //         subject: req.body.subjects
    //     };

    //     if (req.body.uType == 1) {
    //         console.log('create student');
    //         db.Student.create(user).then(function(req, res, next) {
    //             console.log("new student body here", req.body);
    //             res.redirect('/student');
    //         });

    //     } else {
    //         console.log('create tutor');
    //         db.Tutor.create(user).then(function(req, res, next) {
    //             res.redirect('/tutor');
    //         });
    //     }
    //     console.log('USER: ' + JSON.stringify(user));
    //     //    res.redirect('/');
    // });

// });


// router.get('/tutor/:id', function(req, res) {
//     /* get tutor with id  from database find()*/
// //    var user = orm.getTutor(id);


//   res.render('tutors', {  });
// });

// router.get('/student/:id', function(req, res) {
//     /* get tutor with id */
//  //   var user = orm.getStudent(id);
//   res.render('user.handlebars', {  });
// });
// ----register routes--------------------//

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
    res.render('schedule');
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
