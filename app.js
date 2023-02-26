const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {config} = require("dotenv");
const pkg = require('./package.json');
config();
var bodyParser = require('body-parser')
//Routes
const authRoutes = require('./routes/auth.routes')
const commentRoutes = require('./routes/comment.routes')
const resourceRoutes = require('./routes/resource.routes')
const reviewRoutes = require('./routes/review.routes')
const studentRoutes = require('./routes/student.routes')
const subjectRoutes = require('./routes/subject.routes')
const teacherRoutes = require('./routes/teacher.routes');
const { logErrors, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');
// const authRoutes = require('./routes/auth.routes')
// const userRoutes = require('./routes/user.routes')


const app = express();
//Settings
app.set("port", process.env.PORT || 3000);

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
    res.json({
        name: pkg.name,
        author: pkg.author,
        description: pkg.description,
        version: pkg.version
    }); 
});
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/teachers', teacherRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

//middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;