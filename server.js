var express = require("express");
var router  = express.Router();
var path    = require("path");
var errorHandler = require(__dirname+'/error.js');
var routes  = require(__dirname+'/routes.js');
var app     = express();

// 
// Settings
// 

app.set('view engine', 'pug');
app.set('views', './views');

// 
// Routes
// 

app.use(express.static(__dirname+'/public'));

routes.run(app);

app.use(errorHandler);

// 
// Run the app
// 

app.listen(8008);
console.log("Running at Port 8008");
