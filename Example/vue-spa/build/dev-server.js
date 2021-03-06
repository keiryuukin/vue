const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const clientConfig = require('../config/webpack.client.config')
const serverConfig = require('../config/webpack.server.config')
module.exports = function setupDevServer(app, onUpdate) {
  let bundle
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })
  app.use(devMiddleware)
  clientCompiler.plugin('done', () => {
      if (bundle) {
        onUpdate(bundle)
      }
  })
  app.use(require('webpack-hot-middleware')(clientCompiler))
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, 'server-bundle.json')
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    bundle = JSON.parse(mfs.readFileSync(outputPath, 'utf-8'))
    onUpdate(bundle)
  })
}

