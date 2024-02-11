const express = require('express');
const databaseconnect = require('./config/database');
const app = express();
require('dotenv').config();


const PORT = process.env.PORT || 3000;

// mongooose.connect(backend_url).then(() => console.log('Connected to Db')).catch((error) => console.log(error));

// <----------------------------Database connect ------------------------------------>
databaseconnect.connect();


// <------------------------------listener -------------------------------->
app.listen(PORT, () => {
    console.log(`listening on port..            ${PORT}`)
});



app.get("/", (req, res) => {

    return res.json({
        success: true,
        message: "Success running..,,.Prabhatsaini"
    })
});
