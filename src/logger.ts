import chalk from "chalk";
import { format } from "util";

const prefix = '   daruk-helper';
const sep = chalk.gray('·');

export const fatal = (fm: any, ...params: any[]) => {
  if (fm instanceof Error) fm = fm.message.trim();
  const msg = format.apply(format, [fm, ...params]);
  console.error(chalk.red(prefix), sep, msg);
}

export const log = (fm: any, ...params: any[]) => {
  const msg = format.apply(format, [fm, ...params]);
  console.log(chalk.white(prefix), sep, msg);
}

export const success = (fm: any, ...params: any[]) => {
  const msg = format.apply(format, [fm, ...params]);
  console.log(chalk.white(prefix), sep, msg);
}
