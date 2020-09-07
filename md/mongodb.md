# mongodb command
*help
show all the command in mongodb
* show dbs
* use
use demo
it will create a db called demo if it no exist, and if it do exist it will change your current space to demo
* insert
db.dogs.insert({somthing : someone})
it will insert a data into  a collection called dogs
* find 
db.dogs.find()
show all the dogs inside the collection dogs
db.dogs.find({})
conditional find
* update
db.dogs.update({somthing: somone},{attr1 : sth1})
* remove
db.dogs.remove({remove conditions})
