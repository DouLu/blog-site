var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var productionConfig = [{
  entry: {
    home: ['./client/home', hotMiddlewareScript],
    login: ['./client/login', hotMiddlewareScript]
  },
  output: {
    filename: './[name]/bundle.js',
    path: path.resolve(__dirname, './public'),
    publicPath: '/'
  },
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new ExtractTextPlugin({
      filename: './[name]/index.css',
      allChunks: true
    })
  ]
}];

module.exports = productionConfig;
