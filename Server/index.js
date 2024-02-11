const express = require('express');
const databaseconnect = require('./config/database');
const app = express();

const userRouter = require('./routes/User.route');
require('dotenv').config();


const PORT = process.env.PORT || 3000;

// mongooose.connect(backend_url).then(() => console.log('Connected to Db')).catch((error) => console.log(error));

// <----------------------------Database connect ------------------------------------>
databaseconnect.connect();

// <----------------------------connect routes-------------------------------->

app.use(express.json());
app.use("/api/v1/auth", userRouter);
// <------------------------------listener -------------------------------->
app.listen(PORT, () => {
    console.log(`listening on port..            ${PORT}`)
});



// app.get("/", (req, res) => {

//     return res.json({
//         success: true,
//         message: "Success running..,,.Prabhatsaini"
//     })
// });
