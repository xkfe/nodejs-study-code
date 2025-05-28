import blessed from 'blessed';

const screen = blessed.screen({
    fullUnicode: true
});

// blessed 也可以实现progressbar，但是没有 cli-progress 那么好用
const progressBar = blessed.progressbar({
  parent: screen,
  top: '50%',
  left: '50%',
  height: 2,
  width: 20,
  style: {
      bg: 'gray',
      bar: {
          bg: 'green'
      }
  }
})

screen.key('C-c', function() {
  screen.destroy();
});

let total = 0;
const timer = setInterval(() => {
  if(total === 100) {
      clearInterval(timer);
      screen.destroy();
  }

  progressBar.setProgress(total)
  screen.render();

  total += 2;
}, 100);

screen.render();