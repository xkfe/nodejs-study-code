import minimist from 'minimist' // 解析参数、指定类型、选项配置、默认值.不支持自动 help

// 使用 node 获取命令行参数
// console.log('node 获取命令行参数', process.argv)

const argv = minimist(process.argv.slice(2),{
  boolean: ['x'],
  string: ['y'],
  unknown(arg) {
    return arg === '-u'
  },
  default: { y: '默认值' },
  alias: { p: 'port', t: 'template' }
});
console.log('minimist 获取命令行参数', argv);