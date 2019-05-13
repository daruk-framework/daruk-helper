/**
 * @desc: glue模板
 */
function glueTemplate(dirname: string, files: string[]) {
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
function serviceTemplate(dirname: string, files: string[]) {
  return `import '@sina/daruk';
${files.map((filename) => `import ${filename} from '../../src/${dirname}/${filename}';`).join('\n')}

declare module '@sina/daruk' {
  interface Service {
    ${files.map((filename, i) => `${i ? '    ' + filename : filename }: ${filename};`).join('\n')}
  }
}`
}

export interface ITemplateIndexSignature {
  [key: string]: (dirname: string, files: string[]) => string;
}

const template: ITemplateIndexSignature = {
  glueTemplate,
  serviceTemplate
}

export default template;
