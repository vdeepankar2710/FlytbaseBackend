const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());
const mongo = require('./mongoDB');


async function main() {
    await mongo.makeDBConnection();

    require("./routes/router")(app);
}

main();

app.listen(port, () => {
    console.log(`the server is listening on port::${port}`);

})