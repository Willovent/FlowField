const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: './dist',
    publicPath: '/assets',
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