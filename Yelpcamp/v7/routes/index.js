//package setup 
var express = require("express");
var router 	= express.Router();
var passport 	  		  	= require("passport"),
	User 				  	= require("../models/user"),
	LocalStrategy 		  	= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose")


//================
// ROUTES
//================
router.get("/",function(req,res){
	res.render("landing");
});
  

//======= AUTH ROUTES========

// show sign up form
router.get("/register",function(req,res){
	res.render("register");
});

// deal with sign up logic
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		});
	});
});


//LOGIN ROUTES
// show the login form
router.get("/login",function(req,res){
	res.render("login")
});

// login logic
// app.post("/login", middleware, callback)
router.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),function(req,res){
});

// LOGOUT ROUTES
router.get("/logout",function(req,res){
	req.logout();// it is a method in passport
	res.redirect("/campgrounds");
}); 

// isLoggedIn middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		 return next();
	}
	res.redirect("/login");
};


// export
module.exports = router;