import si from 'systeminformation';

// 获取当前负载
si.currentLoad(data => {
    // console.log(data);
});

// 获取文件系统信息
si.fsSize(data => {
  // console.log(data);
});

// 获取内存信息
si.mem(data => {
  // console.log(data);
})

// 获取网络接口信息
si.networkInterfaceDefault(iface => {
  // console.log('网络接口', iface);
  // 获取网络接口的统计信息
  si.networkStats(iface, data => {
      // console.log('网络接口的统计信息', data);
      /*
        received bytes，每秒接收的数据量。
        tx_bytes 是 transfer byptes，每秒传输的数据量。
      */
  });
});

// 获取进程信息
si.processes(data => {
  console.log(data);
})