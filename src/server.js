const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const { checkAuthentication, getUserAuthenticated } = require('./lib/auth');

// get database variables
const { database } = require('./keys');

//routes paths
const links = require('./routes/links');
const types = require('./routes/types');
const authentication = require('./routes/authentication');

//inizializationsss
const app = express(); //we execute express and we save the returned object in app

//settings
app.set('port', process.env.PORT || 3000);//if there is not a port we set 4000

//Middelwares (functions which are executed when there is a request)
app.use(morgan('dev'));//to see requests on console
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

require('./lib/passport');

//Global variables
app.use((req, res, next) => {
    app.locals.user= req.user;   
    next();//get data from client, get response of the server and continue code
});


//Routes
//checkAuthentication-- it does not show anything is the person is no logged in
app.use('/links', checkAuthentication, links );
app.use('/types', checkAuthentication, types );
app.use('/user', authentication );


//Public
app.use(express.static(path.join(__dirname, 'public')))

//export module
module.exports = app;
