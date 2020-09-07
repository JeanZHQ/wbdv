var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground")
var comment  = require("./models/comment")
var	seedDB = require("./seeds")

seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
 
// settings to use ejs
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


app.get("/",function(req,res){
	res.render("landing");
});

// index GET  routes  show all campgrounsd

app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allCamgrounds){
					if(err){
						console.log("Something is wrong!!");
					}else{
							res.render("index",{campgrounds:allCamgrounds});
					}
					});

});
// create POST show the campgrounds which are newly added 
app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description  = req.body.description;
	//console.log(req.body);
	var newcampground = {name :name, image :image, description:description};
	Campground.create(newcampground,function(err,newcampground){
	if(err){
		console.log(err);
	}else{
		res.redirect("/campgrounds");
	}
});

});

// new  GET add newcampground
app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
	
});


//show GET show the detial info about campgrounds
app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundcampground);
			res.render("show",{campground:foundcampground})
		}
	}); 
});


app.listen(3000, process.env.IP,function(){
		   console.log("Server Started!");
		   
});