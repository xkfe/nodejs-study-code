import si from 'systeminformation';
import contrib from 'blessed-contrib';

const colors = ['magenta', 'cyan', 'blue', 'yellow', 'green', 'red'];

type ChartType = contrib.Widgets.PictureElement;

type MemData = {
  title: string;
  style: {
    line: string;
  }
  x: number[];
  y: number[];
}


class MemoryMonitor {

  lineChart: ChartType;
  memDonut: ChartType;
  swapDonut: ChartType;

  interval: NodeJS.Timeout | null = null;
  memData: MemData[] = []

  constructor(line: ChartType, memDonut: ChartType, swapDonut: ChartType) {
    this.lineChart = line;
    this.memDonut = memDonut;
    this.swapDonut = swapDonut;
  }

  init() {
    si.mem(data => {
      this.memData = [
        {
          title: 'Memory',
          style: {
            line: colors[0],
          },
          x: Array(60).fill(0).map((_, i) => 60 - i),
          y: Array(60).fill(0),
        },
        {
          title: 'Swap',
          style: {
            line: colors[1],
          },
          x: Array(60).fill(0).map((_, i) => 60 - i),
          y: Array(60).fill(0),
        },
      ];

      this.updateData(data);

      this.interval = setInterval(() => {
        si.mem(data => {
          this.updateData(data);
        });
      }, 1000);
    });
  }

  updateData(data: si.Systeminformation.MemData) {
    const memTitle =
      formatSize(data.total - data.available) +
      ' of ' +
      formatSize(data.total);

    const swapTitle =
      formatSize(data.swaptotal - data.swapfree) +
      ' of ' +
      formatSize(data.swaptotal);

    let memPer = +(100 * (1 - data.available / data.total)).toFixed();
    let swapPer = +(100 * (1 - data.swapfree / data.swaptotal)).toFixed();

    swapPer = isNaN(swapPer) ? 0 : swapPer;

    this.memData[0].y.shift();
    this.memData[0].y.push(memPer);

    this.memData[1].y.shift();
    this.memData[1].y.push(swapPer);

    this.lineChart.setData(this.memData);

    this.memDonut.setData([
      {
        percent: memPer / 100,
        label: memTitle,
        color: colors[0],
      },
    ]);
    this.swapDonut.setData([
      {
        percent: swapPer / 100,
        label: swapTitle,
        color: colors[1],
      },
    ]);
    this.lineChart.screen.render();
  }
}
function formatSize(bytes: number) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB'
}

export default MemoryMonitor;