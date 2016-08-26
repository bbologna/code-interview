var path = require('path');
  var webpack = require('webpack');
  var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  
  module.exports  = {
    context: __dirname,
    entry: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.resolve(__dirname, 'src/frontend/index.js')
    ],
    output: {
      path: __dirname,
      publicPath: '/',
      filename: 'index.js'
    },
    devtool: '#source-map',
    module: {
      loaders : [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.css$/, loader: 'style!css', exclude: /node_modules/},
        { test: /\.png$/, loader: 'url', exclude: /node_modules/}
        // { test: /\.html/, loader: 'file?name=[name].[ext]' }
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
  }

