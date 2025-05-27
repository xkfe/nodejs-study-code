/*
 * @link https://www2.ccs.neu.edu/research/gpc/VonaUtils/vona/terminal/vtansi.htm#erase // ANSI 控制码
*/

import readline from 'node:readline';

// \u001B ASCII 27，即\u001B或\e
console.log('123\u001B[1K456') // 清除从光标位置到行尾的内容

console.log('当前终端行数:', process.stdout.rows);
console.log('等待3秒后清屏...');

// 等待3秒
setTimeout(() => {
    // npm run dev滚动终端显示最新信息 vite 实现: https://github.com/vitejs/vite/blob/8c661b20e92f33eb2e3ba3841b20dd6f6076f1ef/packages/vite/src/node/logger.ts#L44
    const repeatCount = process.stdout.rows - 2; // 获取当前终端的行数
    console.log('将生成', repeatCount, '个换行符');
    const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : ''; // 如果行数大于2，则生成重复的换行符
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0); // 将光标移动到终端的左上角
    readline.clearScreenDown(process.stdout); // 清除从光标位置到行尾的内容
    console.log('清屏完成！');
}, 3000);

// 直接使用 ANSI 控制码字符很麻烦，也不直观，readline是 node 自带的模块，也可以处理如 cursorTo、clearScreenDown，但是不够全面，可以使用 ansi-escapes 这个包来做
import ansiEscapes from 'ansi-escapes';

// const log = process.stdout.write.bind(process.stdout); // 向终端写入内容
// cursorTo 第一个参数是列号、第二个参数是行号。
// log(ansiEscapes.cursorTo(10, 1) + '111');
// log(ansiEscapes.cursorTo(7, 2) + '222');
// log(ansiEscapes.cursorTo(5, 3) + '333');

// 除了 ESC[ 外，还要加上前景色、背景色、加粗、下划线等的设置，用 ; 分割，最后用 m 表示结束。（ https://zh.wikipedia.org/wiki/ANSI%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97#%E9%A2%9C%E8%89%B2 ）
console.log('\n');
console.log('\u001b[36;1;4mxkfe\u001b[0m 666'); // 难以阅读

// 此时又可以使用另外一个库了 chalk 或者 ansi-colors
import chalk from 'chalk';
const clog = console.log;
clog(chalk.blue('Hello') + ' World' + chalk.red('!'));
clog(chalk.green(
	'I am a green line ' +
	chalk.blue.underline.bold('with a blue substring') +
	' that becomes green again!'
));
