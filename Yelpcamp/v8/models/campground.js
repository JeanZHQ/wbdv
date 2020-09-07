var mongoose = require ("mongoose");
var campgroundsSchema = new mongoose.Schema({
	name : String,
	image : String,
	description : String,
	author:{
		id: mongoose.Schema.Types.ObjectId,
		username:String
	},
	comments:[
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "Comment"
		}
	]
});

module.exports = mongoose.model("Campground",campgroundsSchema);