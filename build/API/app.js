// require dependencies
 var express = require("express");
 var mongoose = require('mongoose');
 // specify port
 var port = 80;
 // define app to equal express object
 var app = express();
 // define router to equal express router object
 var router = express.Router();
 // define a universal path to find files at /views/
 var path = __dirname + "/views/";
 // require example.js to import mongoose schema
 require("./save");
 // define examples to be the examples.js file
 var examples = require("./saves.js");

 // tell mongoose to use the global promise engine
 mongoose.Promise = global.Promise;

 // connect to your mlab database replace "change_me" to the mlab link that should look something like so;
 // mongodb://<dbuser>:<dbpassword>@ds133136.mlab.com:33136/db_name
 mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds131697.mlab.com:31697/screen-art-games", {
   useMongoClient: true
 }, function (error) {
   console.log(error);
 })

 // express object use static pathing and the router object
 app.use(express.static(path));
 app.use("/",router);

 // set our access control settings
 app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*")
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS')
   next()
 })

 // tell express that any queries of /example should go to the examples.js file
 app.use("/save", saves);

 // tell the router that any get requests made to / should be sent the index.html
 router.get("/", (req,res) => {
   res.sendFile(path + "index.html");
 })

 // tell the express object to listen at your port variable for requests
 app.listen(port, () => {
   console.log("Live at Port " + port);
 })

 router.use( (req,res,next) => {
   console.log("/" + req.method);
   next();
 })

 // send 404 if no other requests match
 app.use("*", (req,res) => {
   res.sendFile(path + "404.html");
 })
