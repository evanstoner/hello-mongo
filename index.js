var mongo = require("mongodb");
var express = require("express");

var app = express();
var port = process.env.PORT || 8080;

var server = new mongo.Server("localhost", 27017, {auto_reconnect: true});
db = new mongo.Db("vine", server, {safe: true});
ObjectID = mongo.BSONPure.ObjectID;


db.open(function(err, db) {
  if (err) {
    console.log("db.open: " + err);
    console.log("exiting");
    process.exit();
  } else {
    app.listen(port);
    console.log("hello-mongo running on " + port);
  }
})


//Handles post requests
app.use(express.bodyParser());
//Handles put requests
app.use(express.methodOverride()); //TODO: what is this for?

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});


// root resource
app.get("/", function(req, res) {
  res.type("text/plain");
  res.send("hello-mongo is running");
});


// servers resource
var servers = require("./servers");
app.get("/servers", servers.findAll);
app.get("/servers/:server_id", servers.findByID);
app.post("/servers", servers.insert);
app.put("/servers/:server_id", servers.update);
app.delete("/servers/:server_id", servers.delete);