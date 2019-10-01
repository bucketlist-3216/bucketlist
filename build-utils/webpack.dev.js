const { DefinePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        "APP_NAME": JSON.stringify('localhost:3001')
      }
    }),
  ],
}
