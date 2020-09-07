//package setup 
var express = require("express");
var router 	= express.Router({mergeParams:true});
//mergeParams: pass the params in, without it, the ":id" will not be take into the comments routes 
var Campground 	= require("../models/campground");
var	Comment  	= require("../models/cerr.messageomment");
var middleware = require("../middleware");

//COMMENTS/NEW
router.get("/new",middleware.isLoggedIn,function(req,res){
	// find a campgrounds by id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			req.flash("error",err)
			res.redirect("/comments")
		}else{
			res.render("comments/new",{campground:campground });
		}
	});

});

router.post("/",middleware.isLoggedIn,function(req,res){
	//lookup campgrounds using id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			req.flash("error",err.message);
			res.redirect("/campgrounds");
		}else{
			//create a new comments
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash("error",err.message);
				}else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					//save comment 
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully add a comment")
					res.redirect("/campgrounds/"+campground._id);
				}
					
			})
			//connect new comments with campgrounds
			//redirect campgrounds show page 
		}
	})

})


// export
module.exports = router;