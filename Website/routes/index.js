var express = require("express");
var router = express.Router();
var dbhelper = require("../helpers/dbhelper");
var PoductCategory = require("../models/product-category");
var Order = require("../models/order");
var OrderDetail = require("../models/order-details");
var ObjectId = require("mongodb").ObjectId;

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

    router.post("/login", function(req, res, next){
        passport.authenticate("local-login", function(err, user, info){
            console.log(user);
            if (err)
                return next(err);
            if (!user) 
                return res.status(401).send({"ok": false});
            req.login(user, function(err) {
                if (err) { 
                    return res.status(401).send({"ok": false}); 
                } 
                return res.send({"ok": true});
            });
        })(req, res, next);
    });

    router.post("/submitorder", isUserLoggedIn, function(req, res, next){
        console.log(req.user);
        console.log(req.body);
        var user = req.user;
        var cart = req.body;
        var totalPrice = calcTotalPrice(cart);
        var order = new Order(new ObjectId(user._id), new Date(), totalPrice);

        dbhelper.insert("order", order, function(result){
            var orderId = result.insertedId;
            var details = [];
            cart.items.forEach(function(value){
                var orderDetail = new OrderDetail(new ObjectId(orderId),
                    new ObjectId(value._id), 
                    value.quantity, 
                    value.price, 
                    (value.quantity * value.price));
                    details.push(orderDetail);
            });
            dbhelper.insertMany("orderDetail", details, function(result){
                res.json({"orderId": orderId});
            });
        });
    });

    router.get("/userinfo", isUserLoggedIn, function(req, res){
        res.json(req.user);
    });

    router.get("/ordersforcurrentuser", isUserLoggedIn, function(req, res){
        var userId = req.user._id;  
        var objId = new ObjectId(userId);
        dbhelper.find("order", {"userId": objId}, function(result){
            res.json(result);
        });
    });

    router.get('/loggedin', function(req, res) { 
        res.send(req.isAuthenticated() ? true : false); 
    });

    router.get('/logout', function(req, res){
        req.logout();
        res.send({"ok": true});
    });

    return router;
}

function isUserLoggedIn(req, res, next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated())
        return next();
    
    res.sendStatus(401);
}

function calcTotalPrice(cart){
    var totalPrice = 0;
    cart.items.forEach(function(value){
        totalPrice += (value.price * value.quantity);
    });
    return totalPrice;
}

module.exports = routeConfig;
