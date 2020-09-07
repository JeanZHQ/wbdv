var	Campground 				= require("../models/campground"),
	Comment  				= require("../models/comment")
var middlwareObj={};


middlwareObj.isLoggedIn = function(req,res,next){
		if(req.isAuthenticated()){
		 return next();
	}
	res.redirect("/login");
};

middlwareObj.checkCamgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){
				Campground.findById(req.params.id,function(err,foundcampground){
		if(err){
			res.redirect("back");
		}else{
			if(foundcampground.author.id.equals(req.user._id)){
				next();
				
			}else{
				res.redirect("back");
			}
			
		}
	});
	
	}else{
		res.redirect("back");
	}
};

module.exports = middlwareObj;