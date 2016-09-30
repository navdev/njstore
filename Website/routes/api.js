var express = require("express");
var router = express.Router();
var dbhelper = require("../helpers/dbhelper");
var objectId = require("mongodb").ObjectId;
var User = require("../models/user");

router.get("/catalogs", function(req, res, next) {
    dbhelper.find("productCategory", {}, function(result){
        res.json(result);
    });
});

router.get("/products", function(req, res, next) {
    dbhelper.find("product", {}, function(result){
        res.json(result);
    });
});

router.get("/product/:id", function(req, res, next) {
    var productId = req.params.id;
    var objId = new objectId(productId);
    dbhelper.find("product", {"_id": objId}, function(result){
        res.json(result);
    });
});

router.get("/catalog/:id", function(req, res, next) {
    var categoryId = req.params.id;
    var objId = new objectId(categoryId);
    dbhelper.find("productCategory", {"_id": objId}, function(result){
        res.json(result);
    });
});

router.post("/register", function(req, res, next) {
    var user = new User();
    user.username = req.body.email;
    user.password = req.body.password;
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phone = req.body.phone;
    console.log(user);
    dbhelper.insert("user", user, function(result){
        res.json({ success: result.result.n > 0 });
    });
});

router.get("/productsbycategory/:id", function(req, res, next) {
    var categoryId = req.params.id;
    var objId = new objectId(categoryId);
    dbhelper.find("product", {"categoryId": objId}, function(result){
        res.json(result);
    });
});

module.exports = router;
