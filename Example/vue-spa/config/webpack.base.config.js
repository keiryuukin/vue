const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
config = {
  entry: {
    app: './build/client-entry.js',
    vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'vue-meta', 'superagent']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'script.js'
  },
  resolve: {
    alias: {
      project: path.resolve(__dirname, '../'),
      src: path.resolve(__dirname, '../src'),
      config: path.resolve(__dirname, '../src/config'),
      client: path.resolve(__dirname, '../src/client'),
      components: path.resolve(__dirname, '../src/client/components'),
      static: path.resolve(__dirname, '../static')
    },
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueConfig
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'images/[name].[ext]?[hash:7]'
      }
    }]
  },
  plugins:[],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  }
}
module.exports = config