let express = require('express');
const fs = require("fs");
const app = express();

var read = function(req, res) {
	
	let data = fs.readFileSync('./deebrown.pdf');			
	res.contentType("application/pdf");
    res.send(data);

};

app.get('/read', read);

let server = app.listen(8089,'0.0.0.0',function(){
	let host = server.address().address;
	let port = server.address().port;

	console.log("File Hosting app running at http://%s:%s",host, port);
});