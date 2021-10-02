const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (_, argv) => {
  console.log(`Building in ${argv.mode} mode.\n`);
  const isDevMode = argv.mode === 'development';

  return {
    mode: argv.mode,
    entry: {
      index: ['./src/index.tsx'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: isDevMode ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
      publicPath: '/',
      clean: true,
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.tsx', '.jsx', '.ts', '.js'],
      alias: {
        '@images': path.resolve(__dirname, 'src/assets/images'),
        '@scss': path.resolve(__dirname, 'src/assets/scss'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@screens': path.resolve(__dirname, 'src/screens'),
        '@app': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'public', 'index.html'),
        favicon: path.join(__dirname, 'public', 'favicon.ico'),
        cache: false,
        inject: 'head',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: isDevMode ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDevMode ? '[id].css' : '[id].[contenthash].css',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'public'),
            to: path.join(__dirname, 'dist'),
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
        directory: path.join(__dirname, 'dist'),
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
    optimization: {
      minimize: !isDevMode,
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  };
};
