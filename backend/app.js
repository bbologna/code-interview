var express = require('express');
var path = require('path');
var app = express();

// Start webpack configuration

(function() {
  var webpack = require('webpack');

  var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  
  var config = {
    context: __dirname,
    entry: [
      // Add the client which connects to our middleware
      // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
      // useful if you run your app from another point like django
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      // And then the actual application
      path.resolve(__dirname, '../frontend/index.js')
    ],
    output: {
      path: __dirname,
      publicPath: '/',
      filename: 'bundle.js'
    },
    devtool: '#source-map',
    module: {
      loaders : [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
  }

  var webpackConfig = config;
  var compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
})()

// End webpack configuration

// Setup static files folder
app.use('/dist', express.static(path.resolve(__dirname, '../dist')))
app.use('/dist', express.static(path.resolve(__dirname, '../node_modules')))

// Setup index to page
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});
	
// Start listening
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});