var objectId = require("mongodb").ObjectId;
var dbhelper = require("./helpers/dbhelper");
var productCategory = require("./models/product-category");
var product = require("./models/product");
var MongoClient = require('mongodb').MongoClient;

var pc1 = new productCategory("T-Shirts", new objectId("57eb54e04094031a409f06f8"));
dbhelper.insert("productCategory", pc1, function(result){
        console.log(result);
});

//ObjectId("57eb54e04094031a409f06fc", )
var pc5 = new productCategory("Shirts", new objectId("57eb54e04094031a409f06fc"));
dbhelper.insert("productCategory", pc5, function(result){
        console.log(result);
});

//ObjectId("57eb54e04094031a409f06f9")
var pc2 = new productCategory("Trousers", new objectId("57eb54e04094031a409f06f9"));
dbhelper.insert("productCategory", pc2, function(result){
        console.log(result);
});

var pc8 = new productCategory("Jeans", new objectId("57ecbb5675ca331438938855"));
dbhelper.insert("productCategory", pc8, function(result){
        console.log(result);
});

//ObjectId("57eb54e04094031a409f06fa")

var pc3 = new productCategory("Dress", new objectId("57eb54e04094031a409f06fa"));
dbhelper.insert("productCategory", pc3, function(result){
        console.log(result);
});

//ObjectId("57eb54e04094031a409f06fb", new objectId("57eb54e04094031a409f06f9"))
var pc4 = new productCategory("Shorts", new objectId("57eb54e04094031a409f06fb"));
dbhelper.insert("productCategory", pc4, function(result){
        console.log(result);
});


var pc6 = new productCategory("Watches", new objectId("57eb95e9b346311a20c637f3"));
dbhelper.insert("productCategory", pc6, function(result){
        console.log(result);
});

var pc7 = new productCategory("Shoes", new objectId("57eb964db346311a20c637f5"));
dbhelper.insert("productCategory", pc7, function(result){
        console.log(result);
});

var myCollection;
MongoClient.connect('mongodb://localhost:27017/estoredb', function(err, db) {
  if (err) {
    throw err;
  }
  console.log("connected to the mongoDB !");
  myCollection = db.collection('product');
  myCollection.insert([
	{categoryId:pc1._id, productName:"Polo T-Shirt",productType:"TShirt",description:"Shirt",price:599.00, imageSource:"polotshirt.jpg"},
	{categoryId:pc1._id, productName:"Grey T-Shirt",productType:"TShirt",description:"Grey T-Shirt",price:500.00, imageSource:"GreyTShirt.jpg"},
	{categoryId:pc1._id, productName:"RoundNeck T-Shirt",productType:"TShirt",description:"Round Neck ",price:699.00, imageSource:"RoundNeck.jpg"},
	{categoryId:pc1._id, productName:"InkovyHood T-Shirt",productType:"inkovy-hood-full-black TShirt",description:"Shirt",price:799.00, imageSource:"inkovy-hood-full-black.jpg"},
	{categoryId:pc1._id, productName:"NycCollarManiac T-Shirt",productType:"TShirt",description:"nyc-collar-maniac Shirt",price:599.00, imageSource:"nyc-collar-maniac.jpg"},
	
	{categoryId:pc2._id, productName:"Regular Trouser",productType:"Trouser",description:"Trouser",price:999.00, imageSource:"RegulerFitTrouser.jpg"},
	{categoryId:pc2._id, productName:"Trouser-Crocks-Club",productType:"Trouser",description:"Trouser-Crocks-Club",price:500.00, imageSource:"Trouser-crocks-club.jpg"},
	{categoryId:pc2._id, productName:"Goswhit-36-Trouser",productType:"Trouser",description:"Goswhit-36-Trouser",price:699.00, imageSource:"Trouser-goswhit-36.jpg"},
	{categoryId:pc2._id, productName:"Trouser",productType:"Trouser",description:"Trouser-lewis-kr-khaki-indian-terrain",price:799.00, imageSource:"Trouser-lewis-kr-khaki-indian-terrain.jpg"},
	{categoryId:pc2._id, productName:"Trouser",productType:"Trouser",description:"Trouser-washed-denim-flying-machine-32",price:599.00, imageSource:"Trouser-washed-denim-flying-machine-32.jpg"},
	

	
	{categoryId:pc8._id, productName:"Jeansbluelee32",productType:"Jeans",description:"Jeansbluelee32",price:999.00, imageSource:"Jeansbluelee32.jpg"},
	{categoryId:pc8._id, productName:"Jeans-blue-ms-newport",productType:"Jeans",description:"Jeans-blue-ms-newport",price:500.00, imageSource:"Jeans-blue-ms-newport.jpg"},
	{categoryId:pc8._id, productName:"Jeans-lue-lee-32",productType:"Jeans",description:"Jeans-lue-lee-32",price:699.00, imageSource:"Jeans-lue-lee-32.jpg"},
	{categoryId:pc8._id, productName:"Jeans-super-x-32-original",productType:"Jeans-super-x-32-original",description:"Jeans-super-x-32-original",price:799.00, imageSource:"Jeans-super-x-32-original.jpg"},
	{categoryId:pc8._id, productName:"Jeans-super-x-38-original",productType:"Jeans-super",description:"Jeans-super-x-38-original",price:599.00, imageSource:"Jeans-super-x-38-original.jpg"},
	
	{categoryId:pc6._id, productName:"Watch--fastrack",productType:"Watch",description:"Watch--fastrack",price:1299.00, imageSource:"Watch--fastrack.jpg"},
	{categoryId:pc6._id, productName:"casio Watch",productType:"Watch",description:"casio watch",price:2540.00, imageSource:"casio.jpg"},
	{categoryId:pc6._id, productName:"titan-original watch",productType:"watch",description:"titan-original watch",price:699.00, imageSource:"titan-original.jpg"},
	{categoryId:pc6._id, productName:"fossil-original watch",productType:"fossil-original watch",description:"fossil-original watch",price:799.00, imageSource:"fossil-original.jpg"},
	{categoryId:pc6._id, productName:"sonata-original.jpg",productType:"watch",description:"sonata-original.jpg",price:1599.00, imageSource:"sonata-original.jpg"},
	
	{categoryId:pc7._id, productName:"black-adidas shoes",productType:"shoes",description:"black-adidas showes",price:1299.00, imageSource:"black-metsil-nt-met-powred-black-adidas.jpg"},
	{categoryId:pc7._id, productName:"black-rocksoft shoes",productType:"shoes",description:"black-rocksoft",price:540.00, imageSource:"black-rocksoft.jpg"},
	{categoryId:pc7._id, productName:"camel-g-woodland",productType:"shoes",description:"camel-g-woodland shoes",price:699.00, imageSource:"camel-g-woodland.jpg"},
	{categoryId:pc7._id, productName:"khaki-ogd-woodland",productType:"khaki-ogd-woodland shoes",description:"khaki-ogd-woodland ",price:1799.00, imageSource:"khaki-ogd-woodland.jpg"},
	{categoryId:pc7._id, productName:"blue-pm-jeans-moccasins-pede-milan",productType:"shoes",description:"blue-pm-jeans-moccasins-pede-milan",price:1599.00, imageSource:"blue-pm-jeans-moccasins-pede-milan.jpg"},
	
	
	{categoryId:pc5._id, productName:"Casual Shirt",productType:"Shirt Casual",description:"Shirt Casual",price:1299.00, imageSource:"ShirtCasual.jpg"},
	{categoryId:pc5._id, productName:"Shirt Formal",productType:"Shirt Formal",description:"Shirt Formal",price:1399.00, imageSource:"ShirtFormal.jpg"},
	{categoryId:pc5._id, productName:"Shirt Formal",productType:"Shirt Formal",description:"Shirt Formal-John-players-42-Original",price:1599.00, imageSource:"John-players-42-Original.jpg"},
	{categoryId:pc5._id, productName:"Shirt Formal",productType:"Shirt Formal",description:"Shirt Formal-Original",price:1299.00, imageSource:"Original.jpg"},
	{categoryId:pc5._id, productName:"Shirt Formal",productType:"Shirt Formal",description:"White-feed-Cup-42-original",price:1299.00, imageSource:"white-feed-up-42-original.jpg"},	

        {categoryId:pc3._id, productName:"SED UT PERSPICIATIS",productType:"Chinese Fabric",description:"It's a women fancy dress",price:1599.00, imageSource:"p1.jpg"},
	{categoryId:pc3._id, productName:"GREAT EXPLORER",productType:"Japanese Fabric",description:"It's a beautyfull women fancy dress",price:1599.00, imageSource:"p2.jpg"},

        {categoryId:pc3._id, productName:"SHRINKING",productType:"Attractive Dress",description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",price:2299.00, imageSource:"p4.jpg"},
	
	{categoryId:pc3._id, productName:"Neque Porro",productType:"Attractive Women Dress",description:"It's a Neque Porro dress which looks extremely beautiful",price:2099.00, imageSource:"Neque Porro.jpg"},
	
	{categoryId:pc3._id, productName:"NequePorro",productType:"Women Dress",description:"It's a Neque Porro dress which looks extremely beautiful",price:20999.00, imageSource:"NequePorro.jpg"},
	{categoryId:pc3._id, productName:"Perfectly Simple",productType:"Perfectly Simple Women Dress",description:"It's a Neque Porro dress which looks extremely beautiful",price:2199.00, imageSource:"Perfectly Simple.jpg"},
	{categoryId:pc3._id, productName:"PraisingPain",productType:"PraisingPain Women Dress",description:"It's a Neque Porro dress which looks extremely beautiful",price:1999.00, imageSource:"PraisingPain.jpg"},


	{categoryId:pc4._id, productName:"Jockey-Original",productType:"Mens Shorts",description:"It's a Men's short  dress which looks extremely cool",price:1299.00, imageSource:"Jockey-Original.jpg"},
	{categoryId:pc4._id, productName:"Jockey-M-Original",productType:"Mens Shorts",description:"It's a Men's short  dress which looks extremely cool",price:1499.00, imageSource:"jockey-m-original.jpg"},
	{categoryId:pc4._id, productName:"Three-Nik-kaizen-free-original",productType:"Mens Shorts",description:"It's a Men's short  dress which looks extremely cool",price:1099.00, imageSource:"Three-nik-kaizen-free-original.jpg"},
 	{categoryId:pc4._id, productName:"Combo-1-Navy-White-aurro-xxl-Original",productType:"Mens Shorts",description:"It's a Men's short  dress which looks extremely cool",price:1599.00, imageSource:"Combo-1-navy-white-aurro-xxl-original.jpg"},
	{categoryId:pc4._id, productName:"Navy-Arrow-Sports",productType:"Mens Shorts",description:"It's a Men's short  dress which looks extremely cool",price:1699.00, imageSource:"Navy-arrow-sports.jpg"},
	{categoryId:pc4._id, productName:"Khaki-arrow-Sports-32-Original",productType:"Mens Shorts",description:"It's a Men's short  dress which looks extremely cool",price:1599.00, imageSource:"Khaki-arrow-sports-32-original.jpg"},



	],function(err,result){
      if(err)
      throw err;
      console.log("entry saved");
  });
  db.close();
});

/*
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
*/	