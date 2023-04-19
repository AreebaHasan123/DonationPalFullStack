require('dotenv').config();
require('app-module-path').addPath(__dirname)

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
const cors=require('cors');
const passport = require('passport');
const rateLimit=require('express-rate-limit');


  

//Routers
const apiRouter=require('./routes/api/v1/index');

//App initialization
var app = express();

require('config/passport');

//Configure the rate limiter
const limiter= rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

//Connect to Mongo via mongoose
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useUnifiedTopology: true,
    useNewUrlParser:true
})
.then( ()=> console.log('MongoDB connected. '))
.catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);



if(process.env.NODE_ENV === 'production'){
    app.use(cors({
        origin:"https://arehasan-cit43600-donationpal.uc.r.appspot.com"
        
    }));
 }else{
        app.use(cors());
}; 

app.use('/api/v1/index', apiRouter);

module.exports = app;
