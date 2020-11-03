const PATH = require('path')
const HTMLWEBPACKPLUGIN = require('html-webpack-plugin');
const {CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'buddle.js',
    path: PATH.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']

      },
      {
        test: /\.jpg$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]'
          }
        }

      }]

  },
  plugins: [
    new HTMLWEBPACKPLUGIN({
      template: './index.html'
    }),
    new CleanWebpackPlugin()

  ]



}