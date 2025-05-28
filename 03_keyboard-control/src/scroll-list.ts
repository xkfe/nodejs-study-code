import { BaseUI } from './base-ui.js';
import chalk from 'chalk';

export class ScrollList extends BaseUI {
  curSeletecIndex = 0; // 当前选中的索引
  scrollTop = 0; // 滚动条位置

  constructor(private list: Array<string> = []) {
    super() // 调用父类构造函数

    this.render()
  }

  onKeyInput(name: string) {
    // 限制只能输入up和down
    if (name !== 'up' && name !== 'down') {
      return;
    }

    const action: Function = this.KEYS[name];
    action();
    this.render();
  }
  private readonly KEYS = {
    up: () => this.cursorUp(),
    down: () => this.cursorDown()
  }

  cursorUp() {
    this.moveCursor(-1);
  }

  cursorDown() {
    this.moveCursor(1);
  }

  private moveCursor(index: number): void {
    this.curSeletecIndex += index;

    if (this.curSeletecIndex < 0) {
      this.curSeletecIndex = 0;
    }

    if (this.curSeletecIndex >= this.list.length) {
      this.curSeletecIndex = this.list.length - 1
    }

    this.fitScroll();
  }
  fitScroll() {
    const shouldScrollUp = this.curSeletecIndex < this.scrollTop;

    const shouldScrollDown = this.curSeletecIndex > this.scrollTop + this.terminalSize.rows - 2;

    if (shouldScrollUp) {
      this.scrollTop -= 1;
    }

    if (shouldScrollDown) {
      this.scrollTop += 1;
    }

    this.clear();
  }

  clear() {
    for (let row = 0; row < this.terminalSize.rows; row++) {
      this.clearLine(row);
    }
  }

  getStringWidth(text: string) {
    return [...text].reduce((acc, char) => {
      return acc + (char.charCodeAt(0) > 127 ? 2 : 1)
    }, 0)
  }

  bgRow(text: string) {
    return chalk.bgBlue(text + ' '.repeat(this.terminalSize.columns - this.getStringWidth(text)))
  }


  render() {
    const visibleList = this.list.slice(this.scrollTop, this.scrollTop + this.terminalSize.rows)

    visibleList.forEach((item: string, index: number) => {
      const row = index;

      this.clearLine(row);

      let content = item;

      if (this.curSeletecIndex === this.scrollTop + index) {
        content = this.bgRow(content);
      }

      this.printAt(content, {
        x: 0,
        y: row,
      });
    });
  }
}