var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');

var app = express(); //Creating object of express.

app.use(bodyParser.json()); //Converts body data into JSON data.

var read = function(req, res) {
	
	let data = fs.readFileSync('./book.json');			
	var jsonObj = JSON.parse(data);
	res.json(jsonObj);

};

var insert = function(req, res) {
	
	let data = fs.readFileSync('./book.json');	
	let book = req.body;
	var jsonObj = JSON.parse(data);
	jsonObj.push(book);
	let newbook = JSON.stringify(jsonObj);
	res.json(book);

	fs.writeFile('./book.json', newbook, function(err){
		if(err){
			return console.error(err);
		}	
	});

};

var deletebook = function(req, res) {
	
	let id= req.params.id;
	let newbooks = [];
	var books = fs.readFileSync('./book.json');
	jsonObj = JSON.parse(books);
	
	for(var i=0; i<jsonObj.length; i++){
		if(jsonObj[i].id != id){
			newbooks.push(jsonObj[i]);
		}
	}

	var bookData = JSON.stringify(newbooks);
	fs.writeFile('./book.json',bookData, function(err){
		if(err){
			return console.error(err);
		}	
	});

	res.json(newbooks);

};

var updatebook = function(req, res) {

	let id= req.params.id;
	let updatedBook = req.body;
	var books = fs.readFileSync('./book.json');
	jsonObj = JSON.parse(books);
	
	for(var i=0; i<jsonObj.length; i++){
		if(jsonObj[i].id == id){
			jsonObj[i] = updatedBook;
		}
	}

	var bookData = JSON.stringify(jsonObj);
	fs.writeFile('./book.json',bookData, function(err){
		if(err){
			return console.error(err);
		}	
	});

	res.json(jsonObj);

};

//app.post('/api',callback);
app.get('/read', read);
app.post('/insert', insert);
app.delete('/deletebook/:id', deletebook);
app.put('/updatebook/:id', updatebook);

var server = app.listen(8089,'0.0.0.0',function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("CRUD app running at http://%s:%s",host, port);
});