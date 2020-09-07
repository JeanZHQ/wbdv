const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var catSchema  = new mongoose.Schema({
	name : String,
	age : Number,
	temer :String
	
})
var Cat = mongoose.model("Car",catSchema);

// var kitty  = new Cat({
// 	name : "kitty",
// 	age :11,
// 	temer :"someth"
// })

// kitty is a js variable which has not been sent to the database
// but cat down here in the callback function is what we get from the database

// kitty.save(function(err,cat){
// 	if(err){
// 		console.log("Something goes wrong !!");
// 	}else{
// 		console.log(cat);
// 	}
// });

Cat.create({
	name:"bubu",
	age:3,
	temer: "kuku"
},function. 
});

Cat.find(function(err,cats){
	if(err){
		console.log("oh no wrong !");
	}else{
		console.log(cats);
	}
})