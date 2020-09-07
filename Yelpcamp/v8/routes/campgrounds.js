//package setup 
var express = require("express");
var router 	= express.Router();
var Campground 	= require("../models/campground");
var middleware = require("../middleware");
//../middlware/index.js is a very special js in a package, smth like the main js
 

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
router.post("/",middleware.isLoggedIn,function(req,res){
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
router.get("/new",middleware.isLoggedIn,function(req,res){
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


//EDIT ROUTE
router.get("/:id/edit",middleware.checkCamgroundOwnership,function(req,res){
				Campground.findById(req.params.id,function(err,foundcampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.render("campgrounds/edit",{campground:foundcampground});
			}
			
		}
	)
});


//UPDATE ROUTE
router.put("/:id",function(req,res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		 if(err){
			 res.redirect("/campground");
		 }else{
			// redirect somewhere(show page) !! show the update on the show page
			 
			 res.redirect("/campgrounds/"+req.params.id);
		 }
	});

});

//Destroy a campground
router.delete("/:id",middleware.checkCamgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	})
})



// export
module.exports = router;