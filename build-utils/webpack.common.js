const _ = require('lodash');
const path = require('path');
const { DefinePlugin } = require('webpack');
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

// Figure out if we're on Heroku or local
const isHeroku = () => {
  if (process.env.HEROKU_APP_NAME) return true;
  return false;
}

const envs = {}
let herokuAppName = null;

if (!isHeroku()) {
  console.log(`[build] We're running locally, picking variables from .env file`);
  const result = require('dotenv').config();
  if (result.error) throw result.error;
}
else {
  herokuAppName = process.env.HEROKU_APP_NAME;
  // we cannot use dotenv in production mode, so we pick them from heroku's config vars
  console.log(`[build] HEROKU_APP_NAME=${herokuAppName}`);
}

// here we add each SECRET as environment variables to the front-end;
// build will fail if we're missing any secrets in the .env file
SECRETS.forEach((secret) => {
  if (!process.env[secret]) {
    throw new Error(`[build] environment variable "${secret}" not found`);
  }
  envs[secret] = process.env[secret];
});

// here we expose the API_URL as env variable; and to be build specific
envs["API_URL"] = (isHeroku())
  ? `https://${herokuAppName}.herokuapp.com/api/v1`
  : `http://localhost:3001/api/v1`;

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
    new DefinePlugin({
      "process.env": JSON.stringify(envs),
    })
  ],
  devServer: {
    inline: true,
    port: 5000,
    historyApiFallback: true
  },
}