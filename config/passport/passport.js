//load bcrypt, which secures passwords
var bCrypt = require('bcrypt-nodejs');
var models = require("../../models");

module.exports = function(passport, user) {

    var User = models.User;
    var Student = models.Student;
    var Tutor = models.Tutor;
    // Passport works by using "strategies" for authentication; here we're requiring a simple username and password strategy 
    var LocalStrategy = require('passport-local').Strategy;
    //serialize user


    //serialize user: this saves the User id in a session so we can retrieve it
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialize user: this retrieves the User id 
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    // this is the Passport strategy for registering a new user
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        // encrypting password
        function(req, email, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            var initialData = req;
            // checking to see if given email has already been used to register a user
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    var userPassword = generateHash(password);
                    var authData = {
                        password: userPassword,
                        email: email,
                    };
                    // If not, create a user
                    User.create(authData).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                             return done(null, newUser);

                            // return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
    //LOCAL SIGNIN
    // This is the Passport strategy for logging in a user
    passport.use('local-signin', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {
            var User = models.User;
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };
 User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    console.log('invalid email');
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    console.log('invalid password');
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                console.log("success");
                var userinfo = user.get();
                return done(null, userinfo);

            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your login'
                });
            });
        }
    ));
};