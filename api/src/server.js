const express     = require('express');
const bodyParser  = require('body-parser');
const passport	= require('passport');
const mongoose    = require('mongoose');
const config      = require('./config/config');
const port        = process.env.PORT || 5000; 
const cors        = require('cors');
const webSocket = require('./socket');
const logger = require('morgan');
const globalRouter = require("./routes/global");
const listRouter = require('./routes/list');
const reviewRouter = require('./routes/review');
const app = express();

app.use(logger('dev'));
app.use(cors());
 
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Use the passport package in our application
app.use(passport.initialize());
const passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

app.use('/api/list',listRouter);
app.use('/api/review',reviewRouter);
app.use('/api',globalRouter);

mongoose.connect(config.db, { useNewUrlParser: true , useCreateIndex: true});
 
const connection = mongoose.connection;
 
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
 
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});
 
// Start the server
const server=app.listen(port);
console.log('There will be dragons: http://localhost:' + port);

webSocket(server);