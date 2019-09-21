const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "index.html"
    })
  ],
  devServer: {
    inline: true,
    port: 5000
  },
};