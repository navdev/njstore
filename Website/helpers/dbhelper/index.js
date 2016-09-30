var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");

var connString = "mongodb://localhost:27017/estoredb";

function findDoc(collectionName, filter, callback){
  mongoClient.connect(connString, function (error, db) {
      assert.equal(null, error);
      var collection = db.collection(collectionName);
      collection.find(filter || {}).toArray(function (err, result) {
         console.log("retrieved docs = " + result.length);
         db.close();
         callback(result);
      });
  });
}

function insertDoc(collectionName, doc, callback){
  mongoClient.connect(connString, function (error, db) {
      assert.equal(null, error);
      var collection = db.collection(collectionName);
      collection.insertOne(doc, function (error, result) {
         console.log("Number of records inserted: " + result.result.n);
         db.close();
         callback(result);
      });
  });
}

function insertDocs(collectionName, docs, callback){
  mongoClient.connect(connString, function (error, db) {
      assert.equal(null, error);
      var collection = db.collection(collectionName);
      collection.insertMany(docs, function (error, result) {
         console.log("Number of records inserted: " + result.result.n);
         db.close();
         callback(result);
      });
  });
}

function updateDoc(collectionName, origDoc, updDoc, callback){
  mongoClient.connect(connString, function (error, db) {
      assert.equal(null, error);
      var collection = db.collection(collectionName);
      collection.updateMany(origDoc, updDoc, function (error, result) {
         console.log("Number of records updated: " + result.result.n);
         db.close();
         callback(result);
      });
  });
}

function deleteDoc(collectionName, doc, callback){
  mongoClient.connect(connString, function (error, db) {
      assert.equal(null, error);
      var collection = db.collection(collectionName);
      collection.deleteMany(doc, function (error, result) {
         console.log("Number of records deleted: " + result.result.n);
         db.close();
         callback(result);
      });
  });
}

module.exports = {
  find: findDoc,
  insert: insertDoc,
  insertMany: insertDocs,
  update: updateDoc,
  delete: deleteDoc
};
