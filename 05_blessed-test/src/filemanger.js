import blessed from 'blessed';

const screen = blessed.screen({
  fullUnicode: true
});

const fm = blessed.filemanager({
  parent: screen,
  border: 'line',
  height: 'half',
  width: 'half',
  top: 'center',
  left: 'center',
  label: ' {blue-fg}%path{/blue-fg} ',
  cwd: process.cwd(), // 当前工作目录
  keys: true,
  style: {
    selected: {
      bg: 'blue'
    }
  },
  scrollbar: {
    bg: 'white'
  }
});

fm.on('file', (file)=> {
  screen.destroy();

  console.log(file);
})

screen.key('C-c', function() {
  screen.destroy();
});

// 刷新文件管理器
fm.refresh();

screen.render();