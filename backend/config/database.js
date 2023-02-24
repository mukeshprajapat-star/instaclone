const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected With Server");
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = connectDatabase;
