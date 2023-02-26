const mongoose = require('mongoose');
const {config} = require("dotenv");
config();
var conString = process.env.MONGO_URI;
mongoose.set('strictQuery', true)
mongoose.connect(conString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('Connected to MongoDB: ', db.connection.host))
.catch(err => console.error(err));