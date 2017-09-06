var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
  entry: {
    index: './src/page/index.js',
    about: './src/page/about.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: './',
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader!less-loader"
      })
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin('build'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: './src/views/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9000
  }
}

module.exports = config