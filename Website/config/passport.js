var localStrategy = require("passport-local").Strategy;
var user = require("../models/user");
var dbhelper = require("../helpers/dbhelper");

module.exports = function(passport){

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        console.log("passport deserialize");
        console.log(user);
        done(null, user);
    });

    //Login Strategy
    passport.use("local-login", new localStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function(req, email, password, done){
        console.log("dddd");
        dbhelper.find("user", {"email": email}, function(result){
            console.log(result);
            
            if(result.length > 0){
                var user = result[0];
                if(user.password === password)
                    return done(null, user);    
            }
            
            return done(null, false, req.flash("message", "Incorrect Username or Password"));
        });
    }));

    passport.use("local-register", new localStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function(req, email, password, done){
        dbhelper.find("user", {"email": email}, function(result){

            if(result.length > 0){
                var user = result[0];
                if(user.password === password)
                    return done(null, user);    
            }

            return done(null, false, req.flash("message", "Incorrect Username or Password"));
        });
    }));
};
