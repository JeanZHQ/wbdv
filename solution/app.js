var express =require("express");

app = express();

app.get("/speak/:animal",function(req,res){
	var sound={
		pig:"Oink",
		dog :"woofwoof"
	} ;
	var animal= req.params.animal;

	res.send("this "+animal+" says"+sound[animal])
});

app.get("/repeat/:message/:times",function(req,res){
	var message = req.params.message;
	var times = Number(req.params.times);
	var result ="";
	for(var i=0;i<=time;i++){
		result = result+message;	
	}
	res.send(result);
});


app.get("/",function(req,res){
	res.send("Hi there welcome to my assignment");
});

app.get("*",function(req,res){
	res.send("cant find it!");
});

app.listen(3000, process.env.IP,function(){
		   console.log("Server Started!");
		   
});