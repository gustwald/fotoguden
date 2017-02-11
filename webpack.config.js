module.exports = {
  entry: ['./src/js/main.js'],
  output: {
    filename: 'main.min.js',
    path: `${__dirname}/dist`
  },
  module: {
    loaders: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            cacheDirectory: true, 
            presets: [ 'es2015'] 
        }
      }
    ]
  },
};