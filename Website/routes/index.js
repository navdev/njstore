var express = require("express");
var router = express.Router();
var dbhelper = require("../helpers/dbhelper");
var productCategory = require("../models/product-category");

function routeConfig(passport){
    router.get("/", function(req, res, next) {
    res.render("index", {title: "Online Shopping", message: "My Message"});
    });

    router.get("/partials/:name", function(req, res, next){
        var name = req.params.name;
        res.render("partials/" + name);
    });

    router.get("/templates/:name", function(req, res, next){
        var name = req.params.name;
        res.sendFile(appRoot + "/views/ng-templates/" + name + ".html");
    });

    router.get("/account", isUserLoggedIn, function(req, res, next){
        res.render("index", {title: "Online Shopping", user: req.user});
    });

    router.get("/login", function(req, res, next) {
        res.render("login", {title: "Online Shopping", message: "My Message"});
    });

    router.post("/login", passport.authenticate("local-login", {
        successRedirect: "/account",
        failureRedirect: "/login",
        failureFlash: true
    }));

    router.get("/register", function(req, res, next) {
        res.render("register", {title: "Online Shopping", message: "My Message"});
    });

    router.post("/register", function(req, res, next){
        res.render("sucess-register");
    });

    return router;
}

function isUserLoggedIn(req, res, next){
        if(req.isAuthenticated())
            return next();
        
        res.redirect("/login");
}
/*
router.get("/testpage", function(req, res, next) {
    res.render("testpage", {title: "test form"});
});

router.post("/testpage", function(req, res, next) {
    var pc = new productCategory(req.body.categoryName);
    console.log(pc);
    dbhelper.insert("productCategory", pc, function(result){
        console.log(result);
    });
    res.redirect("/testpage");
});
*/



module.exports = routeConfig;
