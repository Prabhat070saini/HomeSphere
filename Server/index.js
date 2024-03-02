const express = require('express');
const databaseconnect = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/Users.route');
const authRouter = require('./routes/Auth.route');
const listingRouter = require('./routes/Listing.route');
require('dotenv').config();


const PORT = process.env.PORT || 3000;

// mongooose.connect(backend_url).then(() => console.log('Connected to Db')).catch((error) => console.log(error));

// <----------------------------Database connect ------------------------------------>
databaseconnect.connect();

// <----------------------------connect routes-------------------------------->

app.use(express.json());
app.use(cookieParser());
// app.use("/api/v1/auth", userRouter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/update", userRouter);
app.use("/api/v1/listing", listingRouter);
// <------------------------------listener -------------------------------->
app.listen(PORT, () => {
    console.log(`listening on port..${PORT}`);
});



app.get("/", (req, res) => {

    return res.json({
        success: true,
        message: "Success running..,,.Prabhatsaini"
    })
});
// <-------------------------------Middle ware to handle errors..-------------------------------;

// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode;
//     const message = err.message || 'Internal server error';
//     return res.status(statusCode).json({
//         success: false,
//         message,
//         statusCode
//     });

// });