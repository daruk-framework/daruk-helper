import { resolve } from "path";
import { existsSync } from "fs";
import * as logger from "./logger";
import createTypings from "./typings";
import template from "./typings/template";

const baseDir = process.cwd();
const help = (dirnames: string[], options: any) => {
  let isDefault = false
  if (!dirnames.length) {
    isDefault = true
    dirnames = Object.keys(template)
  }
  if (options.typings) {
    dirnames.forEach((dirname) => {
      let dirPath = resolve(baseDir, 'src', dirname)
      if (existsSync(dirPath)) {
        createTypings(dirname, dirPath)
      } else {
        !isDefault && logger.fatal(new Error(`files '${dirPath}' not found`))
      }
    })
  }
}

module.exports = help;
