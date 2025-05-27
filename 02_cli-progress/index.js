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

import { Bar } from 'cli-progress';

const bar = new Bar({
  format: '进度：{bar} | {percentage}% || {value}/{total} || 速度: {speed}', // 进度条格式
  barCompleteChar: '\u2588', // 进度条完成字符
  barIncompleteChar: '\u2591', // 进度条未完成字符
  hideCursor: true // 隐藏光标
});

https.get(downloadURLs.darwin, response => {
  const file = fs.createWriteStream('./chromium.zip');
  const totalBytes = parseInt(response.headers['content-length'] || '0', 10);
  
  bar.start(totalBytes, 0, {
    speed: "0"
  });

  let downloadedBytes = 0;
  
  response.on('data', chunk => {
    downloadedBytes += chunk.length;
    bar.update(downloadedBytes, {
      speed: "下载中..."
    });
  });

  response.on('end', () => {
    bar.stop();
    console.log('\n下载完成！');
  });

  response.on('error', err => {
    console.error('\n下载出错:', err.message);
    bar.stop();
  });

  response.pipe(file);
}).on('error', err => {
  console.error('\n连接出错:', err.message);
});