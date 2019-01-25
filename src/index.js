const path = require('path')
const fs = require('fs')
const createTypings = require('./typings')
const logger = require('./logger')
const template = require('./typings/template')

const baseDir = process.cwd()

module.exports = function help(dirnames, options) {
  let isDefault = false
  if (!dirnames.length) {
    isDefault = true
    dirnames = Object.keys(template)
  }
  if (options.typings) {
    dirnames.forEach((dirname) => {
      let _path = path.resolve(baseDir, 'src', dirname)
      if (fs.existsSync(_path)) {
        createTypings(dirname, _path)
      } else {
        !isDefault && logger.fatal(new Error(`files '${_path}' not found`))
      }
    })
  }
}
