var mongoose = require("mongoose")
//Post title content
var postSchema = new mongoose.Schema({
	title : String,
	content : String
});

// module should be exported to be used outside
module.exports = mongoose.model("Post",postSchema);