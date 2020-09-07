var	Campground 				= require("../models/campground"),
	Comment  				= require("../models/comment")
var middlwareObj={};

middlwareObj.isLoggedIn = function(req,res,next){
		if(req.isAuthenticated()){
		 return next();
	}
	//the method means take "Pleas login first" and store it to flash and won't be display until we see the next page
	req.flash("error","Please login first");
	res.redirect("/login");
};

middlwareObj.checkCamgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){
				Campground.findById(req.params.id,function(err,foundcampground){
		if(err){
			req.flash("error", err.message);
			res.redirect("back");
		}else{
			if(foundcampground.author.id.equals(req.user._id)){
				next();
				
			}else{
				req.flash("error","You don't have permission to do that");
				res.redirect("back");
			}
			
		}
	});
	
	}else{
		req.flash("error","Please login first");
		res.redirect("back");
	}
};

module.exports = middlwareObj;