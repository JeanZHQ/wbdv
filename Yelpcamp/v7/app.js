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

var commentRoutes		= require("./routes/comments"),
	campgroundRoutes	= require("./routes/campgrounds"),
	indexRoutes			= require("./routes/index")

//seedDB();//seed database
mongoose.connect('mongodb://localhost:27017/yelp_camp_v7', {
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

// REQURING ROUTES 
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(indexRoutes);

// TO MAKE IT CONNECTED TO THE SERVER
app.listen(3000, process.env.IP,function(){
		   console.log("Server Started!");
		   
});