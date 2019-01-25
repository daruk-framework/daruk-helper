const fs = require('fs')
const path = require('path')
const {getServiceTemplate, getGlueTemplate} = require('./template')
const logger = require('../logger')

const typingPath = path.join(process.cwd(), 'typings/daruk')

/**
 * @param {*} dirname 文件名
 * @param {*} filePath 文件路径
 * @desc: 生成对应的生成文件
 */
module.exports = function createTypings (dirname, filePath) {
  const files = getFiles(filePath)
  createFiles(dirname, files)
}

/**
 * @desc: 获取所给的文件目录下有哪些需要生成的ts文件
 */
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

/**
 * @param {*} dirname 文件名
 * @param {*} files 需要生成的所有文件声明
 * @desc: 在typings/daruk下生成对应的生成文件
 */
function createFiles (dirname, files) {
  let output = getOutputFiles(dirname, files)
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

/**
 * 
 * @desc: 获取模板
 */
function getOutputFiles (dirname, files) {
  let output
  switch (dirname) {
    case 'services':
      output = getServiceTemplate(dirname, files)
      break
    case 'gules':
      output = getGlueTemplate(dirname, files)
      break
    default:
      output = ''
  }
  return output
}
