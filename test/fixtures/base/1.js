var Walker = require("/Users/jacksontian/git/walk_do");
// TODO: 源文件
var source = '/Users/jacksontian/git/';
var walker = new Walker();
// FIXME: 同步深度遍历文件夹
walker.on('walk', function (_path) {
});
walker.on('end', function () {
  console.log('finished');
});
walker.walk(source);
