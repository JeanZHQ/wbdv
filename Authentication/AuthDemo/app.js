var express 			  	= require("express"),
	bodyParser 			  	= require("body-parser"),
	mongoose 			  	= require("mongoose"),
	passport 	  		  	= require("passport"),
	User 				  	= require("./models/user"),
	LocalStrategy 		  	= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose")





// connect to mongoose
mongoose.connect('mongodb://localhost:27017/auth_demo_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message)); 


var app = express();

// setting to use the response of requsite
app.use(bodyParser.urlencoded({extended:true}));
// settings to use ejs
app.set("view engine","ejs");
//The express-session must should go before the passport.initialize and passport.session
app.use(require("express-session")({// treat it like a function
	secret : "Horgwars exist!",
	resave: false,
	saveUninitialized: false
	//these two properties are just needed
}));
// Use passport
app.use(passport.initialize());
app.use(passport.session());


// setup for passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// very important it is for reading the session and taking data from the session which is encoded that and decoded that.
// and these two method are taken in by "UserSchema.plugin(passportLocalMongoose);"


//======================
//ROUTES

app.get("/",function(req,res){
	res.render("home")
}); 

app.get("/secret",function(req,res){
	console.log(req.isAuthenticated());
	res.render("secret")
});

// AUTH ROUTES
// show sign up form
app.get("/register",function(req,res){
	res.render("register");
});

// handling user signup
// we store the username and the password in different places what we can see in the collection is only the username and a crazy hash version of the password
// authenticate("local") means the authenticate strategy and we can also change this to twitter or google or anything else you can find on website of passport
app.post("/register",function(req,res){
	User.register(new User({username: req.body.username}), req.body.password,function(err,user){
		if(err){
			console.log(err);
			res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/secret");
			console.log(user);
		});
	 });
});


//LOGIN ROUTES
// show the login form
app.get("/login",function(req,res){
	res.render("login")
});

// login logic
//  "middleware":some code run before that the final route callback here
app.post("/login",passport.authenticate("local",{
	successRedirect:"/secret",
	failureRedirect:"/login"
}),function(req,res){
});

// LOGOUT ROUTES
app.get("/logout",function(req,res){
	req.logout();// it is a method in passport
	res.redirect("/");
}); 


// 	write the middleware
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