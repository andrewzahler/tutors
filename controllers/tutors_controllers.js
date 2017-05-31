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
router.get("/schedule", function(req, res, next) {
    res.render("schedule");
});

// API post route to create a new appointment
router.post("/api/appointments", function(req, res, next) { // what does the 'next' argument do?
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

// API Get route for retrieving all tutors for given subject to populate dropdown on scheduling page
router.get("/api/appointments/tutors/:subject", function(req, res, next) {
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

// API Get route for retrieving all appointments for given tutor to populate calendar on scheduling page
router.get("/api/appointments/:TutorId/:date", function(req, res, next) {
    db.Appointment.findAll({
        where: {
            TutorId: req.params.TutorId,
            date: req.params.date
        },
    }).then(function(dbTutorAppts) {
        var hbsObject = {
            appointments: dbTutorAppts
        };
        console.log(hbsObject);
        res.render("schedule", hbsObject);
    });
});



// API put route for updating appointments; to implement after MVP is done
// router.put("/api/appointments", function(req, res) {
//     db.Appointment.update(
//         req.body, {
//             where: {
//                 id: req.body.id
//             }
//         }).then(function(dbAppointment) {
//         res.json(dbAppointment);
//     });
// });

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
