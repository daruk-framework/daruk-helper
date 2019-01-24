const fs = require('fs')
const path = require('path')
const {getServiceTemplate, getPluginTemplate} = require('./template')
const logger = require('../logger')

const typingPath = path.join(process.cwd(), 'typings/daruk')

module.exports = function createTypings (dirname, filePath) {
  const files = getFiles(filePath)
  create(dirname, files)
}

function getFiles (filePath) {
  let files = fs.readdirSync(filePath)
  let _files = []

  //遍历读取到的文件列表
  files.forEach((filename) => {

    //获取当前文件的绝对路径
    var filedir = path.join(filePath, filename);

    //根据文件路径获取文件信息，返回一个fs.Stats对象
    let stats = fs.statSync(filedir)
    var isFile = stats.isFile();//是否是文件
    var isDir = stats.isDirectory();//是否文件夹

    if (isFile && filename !== 'index.ts') {
      _files.push(filename.replace(/(\w+)\.ts/, '$1'))
    }

    if (isDir) {
      if (fs.existsSync(path.resolve(filedir, 'index.ts'))) //递归，如果是文件夹，就判断文件夹下是否有index.ts
      _files.push(filename)
    }
  })
  return _files
}

function create (dirname, files) {
  let output = getOutFiles(dirname, files)
  let outputPath = path.resolve(typingPath, dirname + '.d.ts')

  if (!output) {
    logger.fatal(new Error(`not support ${dirname} at now`))
    return
  }

  fs.writeFile(outputPath, output, 'utf8',function(error){
    if (error) {
      return false;
    }
    logger.success(`created ${dirname + '.d.ts'} success`);
  })
}

function getOutFiles (dirname, files) {
  let output
  switch (dirname) {
    case 'services':
      output = getServiceTemplate(dirname, files)
      break
    case 'plugins':
      output = getPluginTemplate(dirname, files)
      break
    default:
      output = ''
  }
  return output
}
