import blessed from 'blessed';

// @link https://github.com/Unitech/pm2/blob/de0bbad9afe29f4e316452af373d1c7b87655ca0/lib/API/Dashboard.js#L80

// 创建一个支持中文字符的屏幕
const screen = blessed.screen({
  fullUnicode: true
});

const data = [
  "红楼梦",
  "西游记",
  "水浒传",
  "三国演义",
  "儒林外史",
  "金瓶梅",
  "聊斋志异",
  "白鹿原",
  "平凡的世界",
  "围城",
  "活着",
  "百年孤独",
  "围城",
  "红高粱家族",
  "梦里花落知多少",
  "倾城之恋",
  "悲惨世界",
  "哈利波特",
  "霍乱时期的爱情",
  "白夜行",
  "解忧杂货店",
  "挪威的森林",
  "追风筝的人",
  "小王子",
  "飘",
  "麦田里的守望者",
  "时间简史",
  "人类简史",
  "活着为了讲述",
  "白夜行",
  "百鬼夜行"
];

// 创建一个列表
const list = blessed.list({
  width: '50%',
  height: '50%',
  bottom: 0,
  right: 0,
  border: 'bg',
  border: 'line',
  label: '书籍列表',
  keys: true,
  mouse: true,
  style: {
      fg: 'white',
      bg: 'default',
      selected: {
          bg: 'blue'
      }
  },
  items: data
});

// 将列表添加到屏幕上
screen.append(list);

list.select(0);

// 监听列表的选择确认事件
list.on('select', function(item) {
  screen.destroy();

  console.log(item.getText());
});

// 监听屏幕的关闭事件-否则无法使用 ctrl+c 关闭程序
screen.key('C-c', function() {
  screen.destroy();
});

// 监听列表的焦点事件
list.focus();

// 渲染屏幕
screen.render();
