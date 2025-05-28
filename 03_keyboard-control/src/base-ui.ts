import ansiEscapes from 'ansi-escapes';

export interface Position {
  x: number;
  y: number;
}


/**
 * 抽象类，不能被实例化，只能被继承
 * setCursorAt 设置光标位置
 * printAt 打印到指定位置
 * clearLine 清除当前行
 * terminalSize 获取终端可以显示的行列号
 * render 渲染
*/

export abstract class BaseUI {
  private readonly stdout: NodeJS.WriteStream = process.stdout; // 内部且只读的 stdout: 标准输出流


  // protected 受保护的，可以被继承的(当我们不想直接暴露类的属性，想让类属性在子类进行一定的逻辑计算，通过子类暴露。或者想让类属性只能在同一子类内部访问时，可以使用protected关键字)
  protected print(text: string) {
    process.stdout.write.bind(process.stdout)(text); // 绑定到 process.stdout 的标准输出流
  }

  protected setCursorAt({ x, y }: Position) {
    this.print(ansiEscapes.cursorTo(x, y)); // 设置光标位置
  }

  protected printAt(message: string, position: Position) {
    this.setCursorAt(position);
    this.print(message);
  }

  protected clearLine(row: number) {
    this.printAt(ansiEscapes.eraseLine, {x: 0, y: row}); // 清除当前行
  }

  
  get terminalSize(): { columns: number; rows: number } {
    return {
      columns: this.stdout.columns,
      rows: this.stdout.rows,
    };
  }
  abstract render(): void; // 抽象方法，必须被子类实现
}