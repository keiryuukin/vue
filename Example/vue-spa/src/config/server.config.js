const isProd = process.env.NODE_ENV === 'production'
const cache = {
  max: 1000,
  maxAge: 1000 * 60 * 10
}
const port = isProd ? 80 : 8080
module.exports = {
  isProd,
  cache,
  port
}

