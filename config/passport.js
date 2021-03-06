const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/users');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    await User.findOne({ 'email': email }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            req.flash('userExist', `${email} has been used`)
            return done(null, false);
        }

        let newUser = new User();
        // const hash = newUser.hashPassword(req.body.password);

        newUser.firstName = req.body.firstname;
        newUser.lastName = req.body.lastname;
        newUser.email = req.body.email;
        newUser.phoneNum = req.body.phone;
        newUser.password = newUser.hashPassword(req.body.password);

        console.log(newUser);

       newUser.save().then((err) => {
           if(err) {
               return done(err)
           }
           return done(null, newUser)
       })
    })
}))

passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({ 'email': email }, function (err, user) {
        // console.log(user.password, user.email)
        if (err) {
            return done(err);

        }
        if (!user) {
            req.flash('LoginError', 'sorry! didnt work, please try again')
            return done(null, false);
        }

        if (!user.validatePassword(req.body.password, user.password)) {
            req.flash('passwordError', 'your password is incorrect')
            console.log(req.body.password)
            return done(null, false)
        }
        return done(null, user)
    })
}))

