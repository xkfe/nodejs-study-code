import blessed from 'blessed';
import blessedContrib from 'blessed-contrib';

const screen = blessed.screen({
    fullUnicode: true
});

const lineChart = blessedContrib.line({ 
  style: { 
      line: "yellow",
      text: "green",
      baseline: "blue"
  },
  showLegend: true,
  label: '气温变化'
})

const data = {
  title: '北京',
  x: ['10 月 1 日', '10 月 2 日', '10 月 3 日', '10 月 4 日'],
  y: [6, 13, 8, 10],
  style: {
    line: 'red'
  }
}

const data2 = {
  title: '上海',
  color: 'red',
  x: ['10 月 1 日', '10 月 2 日', '10 月 3 日', '10 月 4 日'],
  y: [10, 18, 5, 13]
}

screen.append(lineChart);
lineChart.setData([data,data2]);

screen.key('C-c', function() {
  screen.destroy();
});

screen.render();