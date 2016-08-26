var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/frontend/index.js',
    output: {
        path: './dist',
        filename: 'index.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css', exclude: /node_modules/},
            { test: /\.png$/, loader: 'url', exclude: /node_modules/},
            { test: /\.html$/, loader: "raw-loader" },
        ]
    },
    externals: {
        'angular': 'angular',
        'angular-route' : 'angular-route',
        'angular-ui-ace' : 'angular-ui-ace'
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/frontend/views/index.html'
        })
    ]
};