const express = require('express');
const app = express();

const port = 8080;
app.use(express.json());
const mongo = require('./mongoDB');


async function main() {

    const dbClient = await mongo.MongoClient.connect(mongo.url)
    console.log('conneted to database successfully');

    const db = dbClient.db('flytbaseDB');

}

main();

app.listen(port, () => {
    console.log(`the server is listening on port::${port}`);

})