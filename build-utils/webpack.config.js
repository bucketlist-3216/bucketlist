const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = ({ env }) => {
  console.log('in config')
  console.log(process.env.HEROKU_APP_NAME);
  const envConfig = require(`./webpack.${env}.js`);
  return merge(commonConfig, envConfig);
}
