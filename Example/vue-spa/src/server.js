const config = require('./config/server.config.js')
const utils = require('./utils')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const compression = require('compression')
const app = express()
const bundleRenderer = require('./middleware/bundleRenderer')
bundleRenderer.init(app)
app.use(compression())
app.use(favicon(resolve('../static/logo.png')))
app.use('/', express.static(resolve('../static')))
app.use('/', express.static(resolve('../dist')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  utils.log(`${req.method} ${req.url} from ${req.hostname}`)
  next()
})
app.use('/api', require('./middleware/api'))
app.get('*', bundleRenderer.middleware)
const port = process.env.PORT || config.port
module.exports = app.listen(port, () => {
  utils.log(`Server started at ${port}`)
})

