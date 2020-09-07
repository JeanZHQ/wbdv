var express 			  	= require("express"),
	app 					= express(),
	bodyParser 			  	= require("body-parser"),
	seedDB 					= require("./seeds"),
	mongoose 			  	= require("mongoose"),
	Campground 				= require("./models/campground"),
	Comment  				= require("./models/comment"),
	passport 	  		  	= require("passport"),
	User 				  	= require("./models/user"),
	LocalStrategy 		  	= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose")

seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp_v6', {
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

//PASSPORT CONFIGURATION
app.use(require("express-session")({// treat it like a function
	secret : "Horgwars exist!",
	resave: false,
	saveUninitialized: false
	//these two properties are just needed
}));
// Use passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//pass req.user to every routes
app.use(function(req,res,next){
	// res.locals like local value
	res.locals.currentUser = req.user;
	next();
	// to run the later codes
})



//================
// ROUTES
//================
app.get("/",function(err,req,res){
	if(err){
		console.log(err);
	}
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
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
	// find a campgrounds by id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:campground });
		}
	});

});

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
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

//======= AUTH ROUTES========

// show sign up form
app.get("/register",function(req,res){
	res.render("register");
});

// deal with sign up logic
app.post("/register",function(req,res){
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
app.get("/login",function(req,res){
	res.render("login")
});

// login logic
// app.post("/login", middleware, callback)
app.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),function(req,res){
});

// LOGOUT ROUTES
app.get("/logout",function(req,res){
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


// TO MAKE IT CONNECTED TO THE SERVER
app.listen(3000, process.env.IP,function(){
		   console.log("Server Started!");
		   
});