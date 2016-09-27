var http = require("http");
var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var routes = require("./routes");

//Create App
var app=express();

//Configure View Engine
app.set("views", path.join(__dirname, "views")); //Set view path
app.set("view engine", "pug"); //Set view engine

//Setup middleware
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public"))); //Set static files path

//Routes
app.use("/", routes);

app.get('*', function(req, res, next){
    res.sendfile(__dirname + "/public/" + req.url + ".html");
});

http.createServer(app).listen(3000, function() {
   console.log("Online Shopping App listining at port 3000");
});
