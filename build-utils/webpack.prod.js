const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');


module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new CleanWebpackPlugin(),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '../src/sw.js'),
    }),
  ],
}
