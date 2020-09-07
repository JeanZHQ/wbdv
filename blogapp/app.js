var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/blogapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
 
app.use(bodyParser.urlencoded({extended:true}));
//var request = require("request");
app.set("view engine","ejs");





app.listen(3000, process.env.IP,function(){
		   console.log("Server Started!");
		   
});
