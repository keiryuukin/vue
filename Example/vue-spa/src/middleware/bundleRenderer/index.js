const config = require('../../config/server.config.js')
const utils = require('../../utils')
const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
const createRenderer = (bundle) => {
  return createBundleRenderer(bundle, {
    cache: require('lru-cache')(config.cache)
  })
}
const html = (() => {
  const template = fs.readFileSync(resolve('./template.html'), 'utf-8')
  const i = template.indexOf('<!-- APP -->')
  const style = config.isProd ? '<link rel="stylesheet" href="/styles.css">' : ''
  return {
    head: template.slice(0, i).replace('<!-- STYLE -->', style),
    tail: template.slice(i + '<!-- APP -->'.length)
  }
})()
let app
module.exports = {
  init: function (express) {
    app = express
    if (config.isProd) {
      const bundle = resolve('../../../dist/server-bundle.json')
      app.renderer = createRenderer(bundle)
    } else {
      require('../../../build/dev-server')(app, bundle => {
        app.renderer = createRenderer(bundle)
      })
    }
  },
  middleware: function (req, res) {
    let s = Date.now()
    if (!app.renderer) {
      utils.warn('SERVER NOT READY')
      return res.end('SERVER NOT READY')
    }
    const context = { url: req.url, ua: require('ua-parser-js')(req.headers['user-agent']) }
    const renderStream = app.renderer.renderToStream(context)
    let firstChunk = true
    let state = ''
    renderStream.on('data', chunk => {
      if (firstChunk) {
        const {
          title,
          htmlAttrs,
          bodyAttrs,
          link,
          style,
          script,
          noscript,
          meta
        } = context.meta.inject()
        let head = html.head.replace('<html data-vue-meta-server-rendered', `<html data-vue-meta-server-rendered ${htmlAttrs.text()}`).trim()
        head = head.replace('<body ', `<body ${bodyAttrs.text()}`).trim()
        head = head.replace('<!-- HEAD -->', `${meta.text()}${title.text()}${link.text()}${style.text()}${script.text()}${noscript.text()}`).trim()
        res.write(head)
        firstChunk = false
      }
      res.write(chunk)
    })
    renderStream.on('end', () => {
      utils.log(`Rendered : ${req.url} in ${Date.now() - s}ms`)
      if (context.initialState) {
        state = `<script>window.__INITIAL_STATE__=${JSON.stringify(context.initialState)}</script>`
      }
      res.end(html.tail.replace('<!-- STATE -->', state))
    })
    renderStream.on('error', err => {
      utils.err(`RENDER FAIL : ${req.url}\n${err}`)
      res.status(500).end('500 | Internal Error')
    })
  }
}

