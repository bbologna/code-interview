var express = require('express');
var path = require('path');
var app = express();

var webpack = require('webpack');
var webpackConfig = require('../../webpack.dev.config.js');

var compiler = webpack(webpackConfig);

// Step 2: Attach the dev middleware to the compiler & the server
app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

// Step 3: Attach the hot middleware to the compiler & the server
app.use(require("webpack-hot-middleware")(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

// Setup static files folder
app.use('/dist', express.static(path.resolve(__dirname, '../../dist')))
app.use('/dist', express.static(path.resolve(__dirname, '../../node_modules')))

// Setup index to page
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});
	
// Start listening
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});