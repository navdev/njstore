var express = require("express");
var router = express.Router();
var dbhelper = require("../helpers/dbhelper");
var productCategory = require("../models/product-category");

router.get("/", function(req, res, next) {
   res.render("index", {title: "Online Shopping", message: "My Message"});
});

router.get("/testpage", function(req, res, next) {
    res.render("testpage", {title: "test form"});
});

router.get("/servicedemo", function(req, res, next) {
    res.json({title: "test form"});
});


router.post("/testpage", function(req, res, next) {
    var pc = new productCategory(req.body.categoryName);
    console.log(pc);
    dbhelper.insert("productCategory", pc, function(result){
        console.log(result);
    });
    res.redirect("/testpage");
});

router.get("/partials/:name", function(req, res, next){
    var name = req.params.name;
    res.render("partials/" + name);
});

router.get("/templates/:name", function(req, res, next){
    var name = req.params.name;
    res.sendFile(appRoot + "/views/ng-templates/" + name + ".html");
});

module.exports = router;
