const express = require('express');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error');
const path = require('path');
const fileUpload=require("express-fileupload")

const app = express();

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(fileUpload());


// import routes
const post = require('./routes/postRoute');
const user = require('./routes/userRoute');
const chat = require('./routes/chatRoute');
const message = require('./routes/messageRoute');

app.use('/api/v1', post);
app.use('/api/v1', user);
app.use('/api/v1', chat);
app.use('/api/v1', message);

// deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,"../frontend/build")))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}

// error middleware
app.use(errorMiddleware);


module.exports = app;