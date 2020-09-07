var express =require("express");

app = express();

app.get("/speak/:animal",function(req,res){
	var animal = {pig, dog , cow}
});

app.get("/",function(req,res){
	res.send("Hi there welcome to my assignment");
});

app.listen(3000, process.env.IP,function(){
		   console.log("Server Started!");
		   
});