const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // entry: './src/index.js',
  entry: {
    app: './app/index.js',
  },
  // 方便开发调试
  devtool: 'inline-source-map',
  // webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)
  devServer: {
    contentBase: './public', // 告诉开发服务器(dev server)，在哪里查找文件
    hot: true, // 热更新
  },
  plugins: [
    new CleanWebpackPlugin(['public/dist']),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ],
  output: {
    // filename: 'main.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};