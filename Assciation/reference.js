var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/blog_demo_2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//Post title content
var Post = require("./modules/post")
// User email name
var User = require("./modules/user")

// Post.create({
// 	title:"how to cook soup",
// 	content:"diuhfs"
// },function(err,post){
// 	User.findOne({name : "charlie"},function(err,foundUser){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			foundUser.posts.push(post);
// 			foundUser.save(function(err,data){
// 				if(err){
// 					console.log(err);
// 				}else{
// 					console.log(data);
// 				}
// 			});
			
// 		}
// 	});
// });

// User.findOne({name :"charlie"}).populate("posts").exce(function(...)))
// // User.create({
// 	email: "charlie@horgwarts.com",
// 	name: "charlie"
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
// User.findOne({name : "charlie"},function(err,user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 		// user.posts.push({
// 		// 	title:"win a quidich",
// 		// 	content:"don't drop from the broom"
// 		// });
// 		// user.save(function(err,user){
// 		// 	if(err){
// 		// 		console.log(err);
// 		// 	}else{
// 		// 		console.log(user);
// 		// 	}
// 		// });
// 	};
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
