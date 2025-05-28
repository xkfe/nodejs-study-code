import blessed from 'blessed';
import blessedContrib from 'blessed-contrib';

const screen = blessed.screen({
    fullUnicode: true
});

const donut = blessedContrib.donut({
    label: '进度',
    radius: 20,
    arcWidth: 10,
    remainColor: 'black',
    data: [
        { percent: 0, label: 'aaa 进度', color: 'green' },
        { percent: 0, label: 'bbb 进度', color: 'red' },
        { percent: 0, label: 'ccc 进度', color: [242, 178, 25] }
    ]
});

screen.append(donut)

var pct = 0
setInterval(() => {
    if (pct >= 1) {
        // pct = 0;
        screen.destroy();
    }

    donut.update([
		{percent: parseFloat(pct).toFixed(2), label: 'aaa 进度','color': 'green'},
		{percent: parseFloat(pct).toFixed(2), label: 'bbb 进度','color': 'red'},
		{percent: parseFloat(pct).toFixed(2), label: 'ccc 进度','color':  [242, 178, 25]},
	]);
    screen.render();

    pct += 0.05;
}, 100);

screen.key('C-c', function() {
    screen.destroy();
});

screen.render();
