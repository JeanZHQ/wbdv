var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/blog_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var mongoose = require("mongoose")
//Post title content
var postSchema = new mongoose.Schema({
	title : String,
	content : String
});

var Post = mongoose.model("Post",postSchema);
// User email name
var userSchema = new mongoose.Schema({
	email : String,
	name: String,
	posts :[postSchema]//use schema not the name of the data here, and remeber, if you want to embed some schema in another, you should definde it first.
});
var User = mongoose.model("User",userSchema);


// var newUser = User({
// 	email: "harry@horgwarts.com",
// 	name: "harry"
// })
// newUser.posts.push({
// 	title:"kill voledmot",
// 	content:"besafe"
// })
// newUser.save(function(err,user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// })
// User.findOne({name : "harry"},function(err,user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		user.posts.push({
// 			title:"win a quidich",
// 			content:"don't drop from the broom"
// 		});
// 		user.save(function(err,user){
// 			if(err){
// 				console.log(err);
// 			}else{
// 				console.log(user);
// 			}
// 		});
// 	}
// });
// var newPost = Post({
// 	title:"content on sth",
// 	content:"askfjhafdiufhs"
// })

// newPost.save(function(err,post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// })
