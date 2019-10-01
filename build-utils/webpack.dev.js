const { DefinePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        "API_URL": JSON.stringify('http://localhost:3001/api/v1')
      }
    }),
  ],
}
