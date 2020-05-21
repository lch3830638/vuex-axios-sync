if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/vuex-axios-sync.js')
} else {
  module.exports = require('./dist/vuex-axios-sync.min.js')
}