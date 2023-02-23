const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
var bodyParser = require('body-parser')

const app = express();
//Settings
app.set("port", process.env.PORT || 3001);

//middlewares
const corsOptions = {};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev')); //Mostrar las peticiones que van llegando por consola

//routes
app.get("/", (req, res) => {
    res.json({ response: "Welcome to the best fucking project in the world" });
});

module.exports = app;