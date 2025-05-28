import blessed from 'blessed';
import blessedContrib from 'blessed-contrib';

const screen = blessed.screen({
    fullUnicode: true
});

const barChart = blessedContrib.bar({ 
  label: '气温变化',
  barWidth: 8,
  barSpacing: 20,
  maxHeight: 20,
  showLegend: true,
})

screen.append(barChart);
barChart.setData({
  titles: ['10.1', '10.2', '10.3', '10.4'],
  data: [6, 13, 8, 10]
});

screen.key('C-c', function() {
  screen.destroy();
});

screen.render();