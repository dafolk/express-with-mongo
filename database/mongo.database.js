const { MongoClient } = require("mongodb");

const uri = "mongodb://node:password@127.0.0.1:27017/node";
const client = new MongoClient(uri);
const db = client.db("node");

module.exports = db;
