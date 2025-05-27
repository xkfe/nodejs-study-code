/**
 * @link https://www.lddgo.net/common/symbol 在线特殊符号大全
*/

import https from 'node:https';
import fs from 'node:fs';

const downloadURLs = {
  linux: 'https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/970501/chrome-linux.zip',
  darwin: 'https://storage.googleapis.com/chromium-browser-snapshots/Mac/970501/chrome-mac.zip',
  win32: 'https://storage.googleapis.com/chromium-browser-snapshots/Win/970501/chrome-win32.zip',
  win64: 'https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/970501/chrome-win32.zip',
};

// import { Bar } from 'cli-progress';

// const bar = new Bar({
//   format: '进度：{bar} | {percentage}% || {value}/{total} || 速度: {speed}', // 进度条格式
//   barCompleteChar: '\u2588', // 进度条完成字符
//   barIncompleteChar: '\u2591', // 进度条未完成字符
//   hideCursor: true // 隐藏光标
// });

// https.get(downloadURLs.darwin, response => {
//   const file = fs.createWriteStream('./chromium.zip');
//   const totalBytes = parseInt(response.headers['content-length'] || '0', 10);

//   bar.start(totalBytes, 0, {
//     speed: "0"
//   });

//   let downloadedBytes = 0;

//   response.on('data', chunk => {
//     downloadedBytes += chunk.length;
//     bar.update(downloadedBytes, {
//       speed: "下载中..."
//     });
//   });

//   response.on('end', () => {
//     bar.stop();
//     console.log('\n下载完成！');
//   });

//   response.on('error', err => {
//     console.error('\n下载出错:', err.message);
//     bar.stop();
//   });

//   response.pipe(file);
// }).on('error', err => {
//   console.error('\n连接出错(可能需要科学上网):', err.message);
// });


// cli-progress 原理简单实现
// import ansiEscapes from 'ansi-escapes';
// process.stdout.write(ansiEscapes.cursorHide); // 隐藏光标
// process.stdout.write(ansiEscapes.cursorSavePosition); // 对应的 ANSI 控制字符保存光标位置
// process.stdout.write('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
// setTimeout(() => {
//   process.stdout.write(ansiEscapes.cursorRestorePosition)
//   process.stdout.write('████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
// }, 1000)
// setTimeout(() => {
//   process.stdout.write(ansiEscapes.cursorRestorePosition)
//   process.stdout.write('███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
// }, 2000)
// setTimeout(() => {
//   process.stdout.write(ansiEscapes.cursorRestorePosition)
//   process.stdout.write('██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
// }, 3000)

// 具体实现 cli-progress 的下载功能
import ansiEscapes from 'ansi-escapes';
import chalk from 'chalk';
import { EOL } from 'os'; // EOL 获取系统对应的换行符
const write = process.stdout.write.bind(process.stdout); // 使用 bind 可以保证 write 方法的 this 指向 process.stdout
export class ProgressBar {
  total = 0;
  value = 0;
  constructor() { }
  start(total, initValue) {
    this.total = total;
    this.value = initValue;

    write(ansiEscapes.cursorHide)
    write(ansiEscapes.cursorSavePosition)

    this.render()
  }
  render() {
    let progress = this.value / this.total;
    if (progress < 0) {
      progress = 0;
    }
    if (progress > 1) {
      progress = 1;
      this.value = this.total;
    }
    const barSize = 40;
    const completeSize = Math.floor(progress * barSize); // 计算完成进度的长度
    const incompleteSize = barSize - completeSize; // 计算剩余长度
    write(ansiEscapes.cursorRestorePosition) // 恢复光标位置
    write(chalk.green('█'.repeat(completeSize)));
    write(chalk.gray('░'.repeat(incompleteSize)));
    write(` ${this.value} / ${this.total}`) // 输出当前进度/总进度
  }
  update(value) {
    this.value = value;

    this.render();
  }

  getTotalSize() {
    return this.total;
  }

  stop() {
    write(ansiEscapes.cursorShow)
    write(EOL)
  }
}

const bar = new ProgressBar();
https.get(downloadURLs.darwin,response => {
  const file = fs.createWriteStream('./chromium.zip');
  const totalBytes = parseInt(response.headers['content-length'] || '0', 10);

  bar.start(totalBytes, 0);

  let downloadedBytes = 0;

  response.on('data', chunk => {
    downloadedBytes += chunk.length;
    bar.update(downloadedBytes);
    
    if (downloadedBytes > totalBytes) {
      bar.stop();
      return;
    }
  })
  response.on('end', () => {
    bar.stop();
  })
  response.on('error', err => {
    console.error('\n下载出错:', err.message);
    bar.stop();
  })
  response.pipe(file); // 将响应流通过管道传输到文件流中
}).on('error', err => {
  console.error('\n连接出错(可能需要科学上网):', err.message);
})
