var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground")
var Comment  = require("./models/comment")
var	seedDB = require("./seeds")

seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp_v4', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
 
// settings to use ejs
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
// use a stylesheet
app.use(express.static(__dirname+"/public"))


app.get("/",function(req,res){
	res.render("landing");
});

// index GET  routes  show all campgrounsd

app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allCamgrounds){
					if(err){
						console.log("Something is wrong!!");
					}else{
							res.render("campgrounds/index",{campgrounds:allCamgrounds});
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
	res.render("campgrounds/new");
	
});


//show GET show the detial info about campgrounds
app.get("/campgrounds/:id",function(req,res){
Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
			if(err){
				console.log(err);
			}else{
				res.render("campgrounds/show",{campground:foundcampground})
			};
		}); 
});

//==============COMMENT ROUTES=================
app.get("/campgrounds/:id/comments/new",function(req,res){
	// find a campgrounds by id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:campground });
		}
	});

});

app.post("/campgrounds/:id/comments",function(req,res){
	//lookup campgrounds using id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			//create a new comments
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+campground._id);
				}
					
			})
			//connect new comments with campgrounds
			//redirect campgrounds show page 
		}
	})

})

app.listen(3000, process.env.IP,function(){
		   console.log("Server Started!");
		   
});