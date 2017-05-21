var Path = require('path')
var Express = require('express')
var app = Express()
var  resolve = function(file){
  return Path.resolve(__dirname, file)
}
app.use('/', Express.static(resolve('./static')))
app.get('*', function(req, res){
  console.log(req)
  res.end(req.path)
})
app.listen(80, function(){
  console.log('Express server at localhost:80')

})