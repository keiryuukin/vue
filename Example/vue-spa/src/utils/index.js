module.exports = {
  timestamp: function (msg) {
    var date = new Date()
    var Y, M, D, h, m, s
    Y = date.getFullYear()
    M = date.getMonth() + 1
    M = M < 10 ? '0' + M : M
    D = date.getDate()
    D = D < 10 ? '0' + D : D
    h = date.getHours()
    h = h < 10 ? '0' + h : h
    m = date.getMinutes()
    m = m < 10 ? '0' + m : m
    s = date.getSeconds()
    s = s < 10 ? '0' + s : s
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
  },
  log: function (msg) {
    console.log('\x1b[32m', `[LOG ${this.timestamp()}] ${msg}\x1b[0m`)
  },
  warn: function (msg) {
    console.warn('\x1b[33m', `[WAR ${this.timestamp()}] ${msg}\x1b[0m`)
  },
  err: function (msg) {
    console.error('\x1b[31m', `[ERR ${this.timestamp()}] ${msg}\x1b[0m`)
  }
}

