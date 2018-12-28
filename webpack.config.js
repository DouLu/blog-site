var webpack = require('webpack');
var path = require('path');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
  entry: {
    home: ['./client/home', hotMiddlewareScript],
    login: ['./client/login', hotMiddlewareScript]
  },
  output: {
    filename: './[name]/bundle.js',
    path: path.resolve(__dirname, './public'),
    publicPath: publicPath
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=8192&context=client&name=[path][name].[ext]'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

module.exports = devConfig;
