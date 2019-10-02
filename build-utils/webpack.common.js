const _ = require('lodash');
const path = require('path');

const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');


const SECRETS = [
  "MYSQL_PASSWORD",
  "GOOGLE_CLIENT_ID",
  "FACEBOOK_APP_ID",
  "FACEBOOK_APP_SECRET"
];

// we cannot use dotenv in production mode
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// here we add each SECRET as environment variables to the front-end;
const envs = {}
SECRETS.forEach((secret) => {
  if (!process.env[secret]) {
    throw new Error(`[build] environment variable "${secret}" not found`);
  }
  envs[secret] = process.env[secret];
});

// here we get the app name from heroku dyno metadata
// and expose it for the front-end via Webpack
// https://devcenter.heroku.com/articles/dyno-metadata#usage
envs["APP_NAME"] = process.env.HEROKU_APP_NAME;

// check if http security. if on heroku, enfore https via envs
envs["IS_HEROKU"] = (process.env.HEROKU_APP_NAME) ? true : false;

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, '../src/client/BucketList.jsx'),
  output: {
    path: path.join(__dirname, '../src/server/build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.inline.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../index.html'),
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin([
      { from: './assets', to: 'assets' }
    ]),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '../src/sw.js'),
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(envs),
    })
  ],
  devServer: {
    inline: true,
    port: 5000,
    historyApiFallback: true
  },
}
