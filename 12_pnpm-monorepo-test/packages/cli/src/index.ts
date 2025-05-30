#!/usr/bin/env node
// 上面这行是告诉操作系统执行这个脚本时，使用 node 解释器

import { Command } from 'commander';
import chalk from 'chalk';

import { add, minus } from '@xkfe/core';

const program = new Command();

program
  .name('num cli')
  .description('计算数字加减')
  .version('0.0.1');

program.command('add')
  .description('加法')
  .argument('a', '第一个数字')
  .argument('b', '第二个数字')
  .action((a: string, b: string) => {
    console.log(chalk.green(add(+a, +b)))
  });

program.command('minus')
  .description('减法')
  .argument('a', '第一个数字')
  .argument('b', '第二个数字')
  .action((a: string, b: string) => {
    console.log(chalk.cyan(minus(+a, +b)))
  });

program.parse();

