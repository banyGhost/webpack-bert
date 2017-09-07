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
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'html-loader'
    }, {
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
    new CleanWebpackPlugin('build'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: './src/views/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      chunks: ['about'],
      template: './src/views/about.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    port: 9000,
    contentBase: path.join(__dirname, 'build')
  }
}

module.exports = config