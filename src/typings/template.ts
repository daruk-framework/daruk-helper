/**
 * @desc: glue模板
 */
function glueTemplate(dirname: string, files: string[]) {
  return `import 'daruk';
${files.map((filename) => `import ${filename} from '../../src/${dirname}/${filename}';`).join('\n')}

declare module 'daruk' {
  interface Glue {
    ${files.map((filename, i) => `${i ? '    ' + filename : filename }: ReturnType<typeof ${filename}>;`).join('\n')}
  }
}`
}

/**
 * @desc: service模板
 */
function serviceTemplate(dirname: string, files: string[]) {
  return `import 'daruk';
${files.map((filename) => `import ${filename} from '../../src/${dirname}/${filename}';`).join('\n')}

declare module 'daruk' {
  interface Service {
    ${files.map((filename, i) => `${i ? '    ' + filename : filename }: ${filename};`).join('\n')}
  }
}`
}

export interface ITemplateIndexSignature {
  [key: string]: (dirname: string, files: string[]) => string;
}

const template: ITemplateIndexSignature = {
  glues: glueTemplate,
  services: serviceTemplate
}

export default template;
