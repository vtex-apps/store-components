'use strict'

const path = require('path')

module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename))

    if (filename.match(/\.svg$/)) {
      return `module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ReactComponent: () => ${assetFilename},
      };`
    }

    return `module.exports = ${assetFilename};`
  },
}
