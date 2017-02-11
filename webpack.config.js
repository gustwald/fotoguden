var webpack = require('webpack')

module.exports = {
  entry: [
      'whatwg-fetch',
      'babel-polyfill',
      './src/js/main.js'
  ],
  output: {
    filename: 'main.min.js',
    path: `${__dirname}/dist`
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include : `${__dirname}/src`,
        loader: 'babel-loader',
        query: {
            presets: [ 'es2015', 'stage-0']
        }
      },
      { test : /\.json/, loader : 'file-loader' }
    ]
  },
  // target : 'node',
  node: {
    // net: 'empty',
  }
};