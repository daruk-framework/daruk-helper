import * as fs from "fs";
import * as path from "path";
import template from "./template";
import * as logger from "../logger";

const typingPath = path.join(process.cwd(), 'typings/daruk');

/**
 * @desc: 获取所给的文件目录下有哪些需要生成的ts文件
 */
function getFiles (filePath: string) {
  let files = fs.readdirSync(filePath)
  let _files: string[] = []

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
      if (fs.existsSync(path.resolve(filedir, 'index.ts'))) //如果是文件夹，就判断文件夹下是否有index.ts
      _files.push(filename)
    }
  })
  return _files
}

function createTypings (dirname: string, filePath: string) {
  const files = getFiles(filePath)  // 获取对应目录下的文件名

  if (!(dirname in template)) {
    logger.fatal(new Error(`not support ${dirname} at now`));
    return
  }

  let output = template[dirname](dirname, files);
  let outputPath = path.resolve(typingPath, dirname + '.d.ts');

  fs.writeFile(outputPath, output, 'utf8',function(error){
    if (error) {
      logger.fatal(new Error(`created ${dirname + '.d.ts'} failed! Error: ${error.message}`));
      return false;
    }
    logger.success(`created ${dirname + '.d.ts'} success`);
  })
}


export default createTypings;
