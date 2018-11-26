var express = require('express');
var url = require('url');
var fs = require('fs');
var http = require('http');
var queryString = require('querystring');
var bodyParser = require('body-parser');
 
var app = express();
 
app.use(bodyParser.json({limit:'1000kb'}));
app.use(bodyParser.urlencoded({limit:'1000kb',extended:true}));
 
var count=0;
 
app.get('/upload.do',function(req,resp){
	console.log('upload.do');
	//var path = url.parse(req.url).pathname;
	//console.log('Request for ' + path);
	var filePath = req.query.filePath;
	//var fileData = req.query.fileData;
	var address = req.query.address;
	
	upload(filePath,'127.0.0.1',8081);
	console.log('*** ' + ++count +' ***');
	var response = {
       "first":req.query.filePath,
       "last":req.query.address
   };
   resp.end(JSON.stringify(response));
});
 
function upload(filePath,address,port){
	
	var Data = readFile(filePath);
	var dataBase64 = Data.toString('base64');
	console.log(Data);
	console.log(dataBase64);
	//var DataJSON = JSON.stringify(Data);
	
	//fs.writeFile('D:/input.txt',dataBase64,function(err){
	//	if(err){
	//		console.err(err);
	//	}
	//});
	var JsonData = queryString.stringify({
		filePath:filePath,
		fileData:dataBase64
	});
	//console.log(JsonData);
	var options = {
		method: "POST",
		host : address,
		port : port,
		path : '/newsiteweb/home',
		headers: {
			'Content-Type':'application/x-www-form-urlencoded'
		}
	};
	
  var req = http.request(options, function(res){
	  res.setEncoding('utf8');
  });
  req.write(JsonData);
  req.end();
}
 
function readFile(filePath){
	var fileData = '';
	try{
		fileData = fs.readFileSync(filePath);
	}catch(e){
		fileData = '';
	}
	return fileData;
}
 
app.post('/download.do',function(req,resp){
	//可直接参考server.js的代码
})
 
var server = app.listen(20000,function(){
	
	console.log('Server started.');
})