const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const config = merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
      'isBrowser': true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    })
  ]
})
if (process.env.NODE_ENV === 'production') {
  const ExtractTextPlugin = require('extract-text-webpack-plugin')
  config.module.rules[0].options.loaders = {
    sass: ExtractTextPlugin.extract({
      fallback: 'vue-style-loader',
      use: ['css-loader?' + JSON.stringify({ discardComments: { removeAll: true } }), 'sass-loader']
    })
  }
  config.plugins.push(
    new ExtractTextPlugin({
      filename:'styles.css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  )
}
module.exports = config

