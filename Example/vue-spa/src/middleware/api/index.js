const express = require('express')
const router = express.Router()
router.get('/', function (req, res) {
  res.json({
    data: {
      message: `API Router`
    }
  })
})
const data = [
  {
    "id":0,
    "name":"Sass & Compass",
    "date":['2017/02','2017/04']
  },
  {
    "id":1,
    "name":"javascript & jQuery",
    "date":['2017/01','2017/03','2017/04']
  },
  {
    "id":2,
    "name":"jQuery DOM",
    "date":['2017/02','2017/04']
  },
  {
    "id":3,
    "name":"Vue.js",
    "date":['2017/02','2017/03']
  },
  {
    "id":4,
    "name":"PHP & MySQL",
    "date":['2017/03','2017/04']
  }
]
router.route('/class')
  .get(function (req, res) {
    res.json({
      "list": data
    })
  })
router.route('/class/:id')
  .get(function (req, res) {
    var ary = data.filter(function(item){
      return item.id == req.params.id
    })
    res.json({
      "item":ary[0] || null
    })
  })
router.use(function (req, res) {
  res.json({
    error: {
      message: `API not match`
    }
  })
  utils.warn('API NOT MATCH')
})
module.exports = router

