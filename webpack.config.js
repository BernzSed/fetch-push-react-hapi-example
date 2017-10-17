var path    = require('path');
var webpack = require('webpack');

module.exports = {
  entry:  [
    './src/client'
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    publicPath: "/assets/",
    filename: 'bundle.js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: 'inline-source-map'
};
