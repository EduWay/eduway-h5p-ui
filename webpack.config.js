const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './example/index.js',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ["file-loader", "extract-loader", "css-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
