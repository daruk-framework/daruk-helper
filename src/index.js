const path = require('path')
const fs = require('fs')
const createTypings = require('./typings')
const logger = require('./logger')

module.exports = function help(dirnames, options) {
  const baseDir = process.cwd()
  if (options.typings) {
    dirnames.forEach((dirname) => {
      let _path = path.resolve(baseDir, 'src', dirname)
      if (fs.existsSync(_path)) {
        createTypings(dirname, _path)
      } else {
        logger.fatal(new Error(`files '${_path}' not found`))
      }
    })
  }
}
