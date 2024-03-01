const hostname='0.0.0.0';
const express= require('express');
const cookieParser = require('cookie-parser');
const port=8000;
const bodyParser= require('body-parser');
const app=express();
const db= require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const session=require("express-session");
const passport =require("passport");
const passportLocal = require("./config/passport-local-strategy.js");


//for reading through the post request
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 //extract styles and scripts from sub pages into the layout
 app.set('layout extractStyles', true);
 app.set('layout extractScripts',true);

 // Set up Express middleware to use Passport
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());


//use express router 
app.use('/',require('./routes/index'));

//set ejs as our template engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){console.log(`error in running the server: ${err}`);}
    else {console.log(`server is up and running on port: ${port}`);}
});