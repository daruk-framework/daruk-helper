
/**
 * @desc: glue模板
 */
function glueTemplate(dirname, files) {
  return `import '@sina/daruk';
${files.map((filename) => `import ${filename} from '../../src/${dirname}/${filename}';`).join('\n')}

declare module '@sina/daruk' {
  interface Glue {
    ${files.map((filename, i) => `${i ? '    ' + filename : filename }: ReturnType<typeof ${filename}>;`).join('\n')}
  }
}`
}

/**
 * @desc: service模板
 */
function serviceTemplate(dirname, files) {
  return `import '@sina/daruk';
${files.map((filename) => `import ${filename} from '../../src/${dirname}/${filename}';`).join('\n')}

declare module '@sina/daruk' {
  interface Service {
    ${files.map((filename, i) => `${i ? '    ' + filename : filename }: ${filename};`).join('\n')}
  }
}`
}

module.exports = {
  'glues': {
    get: glueTemplate
  },
  'services': {
    get: serviceTemplate
  }
}