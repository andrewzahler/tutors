var express = require("express");
var passport = require("passport");

var router = express.Router();
var db = require("../models");
var passData = require("../config/passport/passport.js");



// GET route for retrieving all students 
router.get('/index', function(req, res, next) {
    db.Student.findAll({

    }).then(function(dbStudent) {
        var hbsObject = {
            students: dbStudent
        };
        // console.log(hbsObject);
        res.render("index", hbsObject);
    });
});



//----home page route--------------------//
// GET route to render home page
router.get('/', function(req, res) {
    res.render('index');
});

//----about page route--------------------//
// GET route to render home page
router.get('/about', function(req, res) {
    res.render('about');
});
//----about page route--------------------//



//----register and login routes--------------------//
// GET route to render login/register page
router.get('/login', function(req, res) {
    res.render('login');
});


// POST route that handles the account registration process; if user is successfully created, it redirects to the next page in the registration process, /profile; otherwise, it  
router.post('/register', passport.authenticate('local-signup', {

    successRedirect: '/profile',
    failureRedirect: '/login'

}));

// GET route that handles the logout process 
router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

// POST route that handles the login process 
router.post('/login', passport.authenticate('local-signin', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log(req);

    db.User.findOne(
        {
            where: {
                id: req.user.id
            }, 
            include: [db.Student, db.Tutor]
        }
        ).then(function(dbUser) {
            // console.log(dbUser);
            // console.log(dbUser);
            if(dbUser.Student !== null){
                res.redirect('/students-home');
            }
            if(dbUser.Tutor !== null){
                res.redirect('/tutors-home');
            }
 
    });
  });
//----login and register routes--------------------//




//---- profile routes -----//
// GET route for loading the profile page, where registered users fill out more profile information
router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile');
});
// POST route that creates either a Student or a Tutor in the database based on user's entry
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


router.get("/schedule", isLoggedIn, function(req, res) {
    // var hbsObject1, hbsObject2;
    // var obj;
    db.User.findOne(
        {
            where: {
                id: req.user.id
            }, include: [db.Student, db.Tutor]
        }
        ).then(function(dbUser) {
        hbsObject = {
            user: dbUser
        };
        console.log(hbsObject);
        res.render("schedule", hbsObject);
    });
   
});

router.post("/api/appointments", function(req, res) { // what does the' argument do?
    // console.log(req.body);
    var userid = req.body.StudentId
    db.Appointment.create(req.body).then(function(dbAppointment) {
        res.json(dbAppointment);
        // res.render("/");
    });
    // console.log(req.body);
});


// GET get route to find all appointments with left outer join including three models
router.get("/api/appointments", function(req, res) {
    db.Appointment.findAll({
        include: [db.Student, db.Tutor]
    }).then(function(dbAppointment) {
        res.json(dbAppointment);
    });
});

// GET route for retrieving a single appointment
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

//----students route--------------------//
// router.get('/students', function(req, res) {
//     res.render('students');
// });


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
// router.get('/tutors', function(req, res, next) {
//     db.User.findOne(
//         {
//             where: {
//                 id: req.user.id
//             }
//         }
//         ).then(function(dbUser) {
//             // console.log(dbUser);
//             db.Tutor.findOne(
//             {
//                 where: {
//                     UserId: dbUser.dataValues.id
//                 },
//                 include: [db.Appointment]
//             }
//                 ).then(function(dbTutor){
//                 var hbsObject = {
//                     tutors: dbTutor
//                 };
//                 console.log(JSON.stringify(hbsObject));
//                 res.render("tutors", hbsObject);
//         });
//     });
// });


router.get('/api/tutors', function(req, res, next) {
    db.Tutor.findAll(
        // include: [db.Post]
    ).then(function(dbTutor) {
        res.json(dbTutor);
    });
});

//GET route for retrieving tutor by id
router.get('/api/tutors/:id', function(req, res, next) {
    db.Tutor.findAll({
        where: {
            id: req.params.id
        }
    }).then(function(dbTutor) {
        res.json(dbTutor);
    });
});


// GET route for retrieving all tutors for given subject to populate dropdown on scheduling page
router.get("/api/tutors/:subject", function(req, res) {
    db.Tutor.findAll({
        where: {
            subject: req.params.subject
        }
    }).then(function(dbSubjectTutors) {
        var hbsObject = {
            tutors: dbSubjectTutors
        };
        res.render("schedule", hbsObject);
    });
});


router.get('/students', isLoggedIn, function(req, res, next) {
    db.User.findOne(
        {
            where: {
                id: req.user.id
            }
        }
        ).then(function(dbUser) {
            // console.log(dbUser);
            db.Student.findOne(
            {
                where: {
                    UserId: dbUser.dataValues.id
                },
                include: [db.Appointment]
            }
                ).then(function(dbStudent){

                var hbsObject = {
                    students: dbStudent
                };
                // console.log(JSON.stringify(hbsObject));
                res.render("students", hbsObject);
        });
    });
    // res.render('students');
});

router.get('/students-home', function(req, res) {
    db.User.findOne(
        {
            where: {
                id: req.user.id
            }
        }
        ).then(function(dbUser) {
            // console.log(dbUser);
            db.Student.findOne(
            {
                where: {
                    UserId: dbUser.dataValues.id
                }
            }
                ).then(function(dbStudent){

                var hbsObject = {
                    students: dbStudent
                };
                // console.log(hbsObject);
                res.render('students-home');
        });
    });
});


router.get('/tutors-home', function(req, res) {
    db.User.findOne(
        {
            where: {
                id: req.user.id
            }
        }
        ).then(function(dbUser) {
            // console.log(dbUser);
            db.Tutor.findOne(
            {
                where: {
                    UserId: dbUser.dataValues.id
                }
            }
                ).then(function(dbTutor){

                var hbsObject = {
                    tutors: dbTutor
                };
                // console.log(hbsObject);
                res.render('tutors-home');
        });
    });
});

router.get('/tutors', isLoggedIn, function(req, res, next) {
    db.User.findOne(
        {
            where: {
                id: req.user.id
            }
        }
        ).then(function(dbUser) {
            // console.log(dbUser);
            db.Tutor.findOne(
            {
                where: {
                    UserId: dbUser.dataValues.id
                },
                include: [db.Appointment]
            }
                ).then(function(dbTutor){

                var hbsObject = {
                    tutors: dbTutor
                };
                // console.log(JSON.stringify(hbsObject));
                res.render("tutors", hbsObject);
        });
    });
    // res.render('students');
});




//--- login helper function for Passport --------------//
// This lets us add the argument isLoggedIn to GET routes for rendering hbs pages to make them accessible only when a user is logged in; if user isn't logged in, it redirects to the login page
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
//--- login helper function --------------//

module.exports = router;