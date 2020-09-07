var mongoose 			  	= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password : String
	
});

// It will add a bunch of metrix coma with the package to our UserSchema, and we need its creatures for our user authentication
UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User",UserSchema);