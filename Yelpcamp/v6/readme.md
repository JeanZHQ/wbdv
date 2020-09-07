topics here

# Add comments
* makes your errors aways
* add comments to the show page

# Comments New/Create
* Discuess Nested Routes
* Add the comments new and Create Routes
* Add the new comments form
 
Restful Routes

name  url  verb  decs.
=============================
INDEX	/dogs		GET		Display a list of dogs
NEW  	/dogs/new	GET		Display the form for creating a new dog
CREATE	/dogs		POST	Show the new dog to DB
SHOW	/dogs/:id	GET		Show the info about one dog

INDEX	/campgrounds		
NEW  	/campgrounds/new	
CREATE	/campgrounds		
SHOW	/campgrounds/:id	

NEW		/campground/:id/comments/new	GET
CREATE	/campground/:id/comments		POST
//We not only create a comment but also connect the comment with campgroud, so we also should store the id here
 