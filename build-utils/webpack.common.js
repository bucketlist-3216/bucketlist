const _ = require('lodash');
const path = require('path');

const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');


const VARIABLES = [
  "MYSQL_PASSWORD",
  "GOOGLE_LOGIN_SECRET",
  "FACEBOOK_LOGIN_SECRET",
  "FACEBOOK_APP"
];

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// here we add each SECRET as environment variables;
const envs = {}
VARIABLES.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`[build] environment variable "${varName}" not found`);
  }
  envs[varName] = process.env[varName];
});
envs["APP_NAME"] = process.env.HEROKU_APP_NAME;


console.log('in webpack commons');
console.log(process.env.HEROKU_APP_NAME);

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, '../src/client', 'BucketList.jsx'),
  output: {
    path: path.join(__dirname, '../', 'src/server/build'),
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
    // new CleanWebpackPlugin(),
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
      "APP_NAME_COMMENT": JSON.stringify('damn this thing'),
      "HEROKU_APP_NAME": process.env.HEROKU_APP_NAME
    })
  ],
  devServer: {
    inline: true,
    port: 5000,
    historyApiFallback: true
  },
}
