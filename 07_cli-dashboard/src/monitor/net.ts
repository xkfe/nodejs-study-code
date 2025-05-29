import si from 'systeminformation';
import contrib from 'blessed-contrib';

type ChartType = contrib.Widgets.PictureElement;

class NetMonitor {

  sparkline: ChartType;

  interval: NodeJS.Timeout | null = null;
  netData: number[] = []

  constructor(line: ChartType) {
    this.sparkline = line;
  }

  init() {
    this.netData = Array(60).fill(0)

    si.networkInterfaceDefault(iface => {
      const updater = () => {
        si.networkStats(iface, data => {
          this.updateData(data[0]);
        });
      };

      updater();

      this.interval = setInterval(updater, 1000);
    });
  }

  updateData(data: si.Systeminformation.NetworkStatsData) {
    const rx_sec = Math.max(0, data['rx_sec']);

    this.netData.shift();
    this.netData.push(rx_sec);

    const rx_label = `Receiving:      ${formatSize(rx_sec)}\nTotal received: ${formatSize(data['rx_bytes'])}`

    this.sparkline.setData([rx_label], [this.netData]);
    this.sparkline.screen.render();
  }
}

function formatSize(bytes: number) {
  if (bytes == 0) {
    return '0.00 B';
  }

  if (bytes < 1024) {
    return Math.floor(bytes) + ' B'
  }

  let num = bytes / 1024;

  if (num > 1024) {
    return (num / 1024).toFixed(2) + ' MB'
  }

  return num.toFixed(2) + ' KB'
}

export default NetMonitor;