const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017';


let usersCollection = null;
let dronesCollection = null;
async function makeDBConnection() {
    const dbClient = await mongoose.connect(url);
    
    console.log('conneted to database successfully');
    // const flytbaseDB = dbClient.db('flytbaseDB');


}


module.exports = { makeDBConnection};