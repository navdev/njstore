var dbhelper = require("../helpers/dbhelper");
var productCategory = require("../models/product-category");
var product = require("../models/product");

var pc1 = new productCategory("T-Shirts");
dbhelper.insert("productCategory", pc1, function(result){
        console.log(result);
});

var pc1 = new productCategory("Pants");
dbhelper.insert("productCategory", pc1, function(result){
        console.log(result);
});

var pc1 = new productCategory("Dress");
dbhelper.insert("productCategory", pc1, function(result){
        console.log(result);
});

var pc1 = new productCategory("Shorts");
dbhelper.insert("productCategory", pc1, function(result){
        console.log(result);
});

var pc1 = new productCategory("Shirts");
dbhelper.insert("productCategory", pc1, function(result){
        console.log(result);
});

var p1 = new product("Shirts");
p1.categoryId = "";
p1.productType = "";
p1.description = "";
p1.price = "";
p1.imageSource = "";

dbhelper.insert("product", p1, function(result){
        console.log(result);
});