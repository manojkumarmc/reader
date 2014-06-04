var express = require('express');
var http = require('http');
var path = require('path');
var socket = require('socket.io');
var fs = require('fs');
var exec = require('child_process').exec;
var q = require('q');


var child;
var app = express();
var server = http.createServer(app);
var io = socket(server);

var clientDir = path.join(__dirname, 'client');
var booksList = [];


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(clientDir));
app.use(express.favicon(__dirname + '/client/img/palette.ico'));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
});



function getFileNames(folderName) {

    var totalFileCount = 0;
    var deffered = q.defer();

    child = exec('ls ' + folderName + '/*.xhtml | wc -l',
		 function (error, stdout, stderr) {

		     totalFileCount = parseInt(stdout)
		     console.log('tfc ' +  totalFileCount)

		     if (error !== null) {
			 console.log('exec error: ' + error);
		     }
		     else {
                         
			 fs.readdir(folderName, function(err, files) {
			     files.forEach(function(file) {
				 fs.stat(folderName + '/' + file, function(err, stats) {
				     if (err) console.log(err)
				     if (stats.isFile()) booksList.push(file)
				     if (booksList.length >= totalFileCount) deffered.resolve()
				 })
			     })
			 })			 
		     }
		 })
    return deffered.promise;
}


io.on('connection', function(socket) {

    getFileNames('/home/mamc/Desktop/epub/SASAA10ePubLG.epub_FILES/html').then(function() {
	socket.emit('respond', booksList)
    })

    socket.on('clickMe', function(data) {
	console.log(data)
    })

})



server.listen(app.get('port'), function(){
    console.log('Server listening - http://localhost: ' + app.get('port'));
});
