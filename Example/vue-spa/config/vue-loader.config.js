const config = {
  postcss: [
    require('autoprefixer')({
      browsers: ['> 0.5%', 'last 3 versions']
    })
  ]
}
module.exports = config

