const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = process.env.NODE_ENV || 'development';

const config = {
  mode,
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  entry: './example/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [MiniCssExtractPlugin.loader,  "css-loader"]
      },
    ]
  },
  externals: {
    jquery: 'jquery'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ]
}

if (mode === 'development') {
  config.devtool = 'source-map';
  config.plugins.push(
    new HtmlWebpackPlugin()
  );
}

module.exports = config;
