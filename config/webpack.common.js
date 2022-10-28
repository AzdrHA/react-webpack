const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const {srcDir, assetsDir, distDir, publicDir, projectDir} = require('./webpack.config');

module.exports = {
  entry: {
    index: [path.join(srcDir, 'index.tsx')],
  },
  output: {
    path: distDir,
    publicPath: '/',
    clean: true,
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
    alias: {
      '@images': path.join(assetsDir, 'images'),
      '@scss': path.join(assetsDir, 'scss'),
      '@components': path.join(srcDir, 'components'),
      '@screens': path.join(srcDir, 'screens'),
      '@app': srcDir,
    },
  },
  plugins: [
    new Dotenv({
      path: path.join(projectDir, '.env'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(publicDir, 'index.html'),
      favicon: path.join(publicDir, 'favicon.ico'),
      cache: false,
      inject: 'head',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: publicDir,
          to: distDir,
          globOptions: {
            ignore: [
              '**/favicon.ico',
              '**/index.html',
            ],
          },
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: distDir,
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
    hot: true,
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 200,
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(jsx|tsx|js|ts)$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
