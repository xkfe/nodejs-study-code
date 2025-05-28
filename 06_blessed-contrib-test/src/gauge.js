import blessed from 'blessed';
import blessedContrib from 'blessed-contrib';

// 比 blessed 的 progressbar 多个进度显示

const screen = blessed.screen({
    fullUnicode: true
});

const gauge = blessedContrib.gauge({
    label: '下载进度', 
    width: 'half',
    stroke: 'green',
    fill: 'white'
});

screen.append(gauge);

let total = 0;
const timer = setInterval(() => {
    if(total === 100) {
        clearInterval(timer);
        screen.destroy();
    }

    gauge.setPercent(total)
    screen.render();

    total += 2;    
}, 100);


screen.key('C-c', function() {
    screen.destroy();
});

screen.render();
