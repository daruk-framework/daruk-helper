
/**
 * @desc: plugin模板
 */
module.exports.getPluginTemplate = (dirname, files) => {
  return `import '@sina/daruk';
${files.map((filename) => `import ${filename} from '../../src/${dirname}/${filename}';`).join('\n')}

declare module '@sina/daruk' {
  interface Plugin {
    ${files.map((filename, i) => `${i ? '    ' + filename : filename }: ReturnType<typeof ${filename}>;`).join('\n')}
  }
}`
}

/**
 * @desc: service模板
 */
module.exports.getServiceTemplate = (dirname, files) => {
  return `import '@sina/daruk';
${files.map((filename) => `import ${filename} from '../../src/${dirname}/${filename}';`).join('\n')}

declare module '@sina/daruk' {
  interface Service {
    ${files.map((filename, i) => `${i ? '    ' + filename : filename }: ${filename};`).join('\n')}
  }
}`
}