const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';

module.exports = { MongoClient, url, ObjectId };