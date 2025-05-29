import { program } from 'commander'

program
  .name('string-util')
  .description('一些字符串工具的 CLI')
  .version('0.8.0')
  .option('-p, --port <n>', 'set port')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  })

program.parse();

// console.log(program.opts())