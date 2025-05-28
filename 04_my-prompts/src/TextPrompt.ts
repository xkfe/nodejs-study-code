import ansiEscapes from 'ansi-escapes';
import { Key, Prompt } from "./Prompt.js";
import chalk from 'chalk';

export interface TextPromptOptions  {
  type: 'text'
  name: string
  message: string
}

// 判断是否为非打印字符
function isNonPrintableChar(char: string) {
  return /^[\x00-\x1F\x7F]$/.test(char);
}

export class TextPrompt extends Prompt {
  out = process.stdout
  cursor = 0
  firstRender = true

  constructor(private options: TextPromptOptions) {
      super(); // 调用父类构造函数
  }

  onKeyInput(str: string, key: Key) {

      // backspace 控制光标左移，清除内容
      if (key.name === 'backspace') {
          this.cursor --;
          this.value = this.value.slice(0, this.cursor);
      }

      // 将输入内容结合，光标右移
      if(!isNonPrintableChar(str)) {
          this.value += str;
          this.cursor ++;
      }

      // 渲染
      this.render();
  }

  clearTerminal() {
    this.out.write(ansiEscapes.clearTerminal);
    this.out.write(ansiEscapes.cursorTo(0));
  }

  render() {
    if(this.firstRender) {
      this.clearTerminal();
      this.firstRender = false;
    }
      this.out.write(ansiEscapes.eraseLine); // 清除当前行

      this.out.write(ansiEscapes.cursorTo(0)); // 将光标移动到行首

      this.out.write([
          chalk.bold(this.options.message),
          chalk.gray('›'),
          ' ',
          chalk.blue(this.value)
      ].join(''))

      this.out.write(ansiEscapes.cursorSavePosition)

      this.out.write(ansiEscapes.cursorDown(1) + ansiEscapes.cursorTo(0))

      if(this.value === '') {
          this.out.write(chalk.red('请输入名字'))
      } else {
          this.out.write(ansiEscapes.eraseLine)
      }

      this.out.write(ansiEscapes.cursorRestorePosition)
  }
}