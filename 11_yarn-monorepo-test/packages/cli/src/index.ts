#!/usr/bin/env node
// 上面这句是告诉操作系统，使用当前目录下的 node 解释器来执行这个脚本
import { Command } from 'commander';
import chalk from "chalk";
import { add, minus } from 'core';

const program = new Command();

program
  .name('num-cli')
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