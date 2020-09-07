//package setup 
var express = require("express");
var router 	= express.Router();
var Campground 	= require("../models/campground");

//=====================
// campgrounsd routes
//=====================

// index GET routes  show all campgrounsd
router.get("/",function(req,res){
	Campground.find({},function(err,allCamgrounds){
					if(err){
						console.log("Something is wrong!!");
					}else{
							res.render("campgrounds/index",{campgrounds:allCamgrounds});
					}
					});

});
// create POST show the campgrounds which are newly added 
router.post("/",isLoggedIn,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description  = req.body.description;
	var author = {
		username: req.user.username,
		id : req.user._id
		
	}
	//console.log(req.body);
	var newcampground = {name :name, image :image, description:description, author:author};
	Campground.create(newcampground,function(err,newcampground){
	if(err){
		console.log(err);
	}else{
		res.redirect("/campgrounds");
	}
});

});

// new  GET add newcampground
router.get("/new",isLoggedIn,function(req,res){
	res.render("campgrounds/new");
	
});


//show GET show the detial info about campgrounds
router.get("/:id",function(req,res){
Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
			if(err){
				console.log(err);
			}else{
				res.render("campgrounds/show",{campground:foundcampground})
			};
		}); 
});


//if you used the middleware in this file you should paste it here
// isLoggedIn middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		 return next();
	}
	res.redirect("/login");
};

// export
module.exports = router;