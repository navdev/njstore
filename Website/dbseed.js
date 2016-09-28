var objectId = require("mongodb").ObjectId;
var dbhelper = require("./helpers/dbhelper");
var productCategory = require("./models/product-category");
var product = require("./models/product");

/*
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
*/
var oid = new objectId("57eb54e04094031a409f06fc");
var p1 = new product("GREAT EXPLORER");
p1.categoryId = oid;
p1.productType = "";
p1.description = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever";
p1.price = 500;
p1.imageSource = "p2.jpg";

dbhelper.insert("product", p1, function(result){
        console.log(result);
});
