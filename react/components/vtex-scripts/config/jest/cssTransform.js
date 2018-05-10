'use strict'

module.exports = {
  process() {
    return 'module.exports = {};'
  },
  getCacheKey() {
    return 'cssTransform'
  },
}
