var express = require("express");
var router = express.Router();
var dbhelper = require("../helpers/dbhelper");
var productCategory = require("../models/product-category");
var objectId = require("mongodb").ObjectId;

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

router.get("/productsbycategory/:id", function(req, res, next) {
    var categoryId = req.params.id;
    var objId = new objectId(categoryId);
    dbhelper.find("product", {"categoryId": objId}, function(result){
        res.json(result);
    });
});

module.exports = router;
