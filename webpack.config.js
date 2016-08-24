var path = require('path')

module.exports = {
    entry: './frontend/index.js',
    output: {
        path: './dist',
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    externals: {
        'angular': 'angular',
        'angular-route' : 'angular-route',
        'angular-ui-ace' : 'angular-ui-ace'
    },
    // devtool: 'eval'
};