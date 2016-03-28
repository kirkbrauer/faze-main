var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var jwt            = require('express-jwt');
var serialize      = require('node-serialize');
NodeRSA            = require('node-rsa');

// config files
var config = require('./config');
secret = config.secret || "secret";
mode = config.mode || "dev";
///config.js template
/*
module.exports = {
  port: process.env.PORT || 8080,
  db_url: "mongodb://localhost:27017/faze-dev",
  secret: process.env.SECRET || "secret",
  mode: process.env.MODE || "dev"
}
*/

// set our port
var port = config.port || 8080;

// connect to our mongoDB database
mongoose.connect(config.db_url || "mongodb://localhost:27017/faze-dev", function(err, db) {
    console.log("Connected to mongodb");
});

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// middleware ==============================================
app.use(function(req, res, next) {
  // do logging
  console.log(req.method+' Request On '+req.url);
  next();
});

// routes ==================================================
require('./app/routes')(app); // configure our routes

// socket-server ===========================================
require('./app/socket-server')(app); // setup socket.io

// start app ===============================================
app.listen(port);

// shoutout to the user
console.log('Listening on ' + port);
