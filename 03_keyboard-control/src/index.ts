import readline from 'node:readline';

readline.emitKeypressEvents(process.stdin); // 监听键盘事件
process.stdin.setRawMode(true); // 禁用掉内置的一些键盘事件处理，比如 ctrl + c 退出进程
process.stdin.on('keypress', (str, key) => {
  if(key.sequence === '\x03') {
    console.log('ctrl + c')
    process.exit()
  }
  console.log(str, key)
});

// 实际项目中，键盘操作非常多。如比 pm2 上下键来切换查看的进程; create-vite 选择框架等操作。现在我们就来实现一下