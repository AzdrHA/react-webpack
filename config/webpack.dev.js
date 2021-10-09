const {merge} = require('webpack-merge');
const path = require('path');
const webpackCommon = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(webpackCommon, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
  },
  plugins: [
    new Dotenv({
      path: path.join(__dirname, '../.env.dev'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
