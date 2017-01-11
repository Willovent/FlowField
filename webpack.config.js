const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.ts',
  },
 devtool: "source-map",
  output: {
    filename: '[name].bundle.js',
    path: './dist',
    sourceMapFilename : '[file].map'
  },  
  resolve: {
    extensions: ['',  '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts' }
    ]
  }
};