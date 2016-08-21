var express = require('express');
var path = require('path');
var app = express();

// Setup static files folder
app.use('/dist', express.static(path.resolve(__dirname, '../dist')))

// Setup index to page
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});
	
// Start listening
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});