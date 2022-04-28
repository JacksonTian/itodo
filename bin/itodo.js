#!/usr/bin/env node

'use strict';

const pt = require('printable');
const program = require('commander'),
  path = require('path'),
  itodo = require('../lib/itodo');

// options
program
  .version(itodo.version)
  .option('-i, --input <folder>', 'Where is the project')
  .option(
    '-f, --filterDir "dir1,dir2"',
    'Default to "node_modules,build,dist"',
  );

// examples

program.on('--help', function () {
  console.log('  Examples:');
  console.log('');
  console.log('    $ itodo -i <folder>');
  console.log('');
});

// parse argv
program.parse(process.argv);

var truncate = function (str, len, tail) {
  len = len || 20;
  tail = tail || '...';
  if (str.length > len) {
    return str.substring(0, len) + tail;
  }
  return str;
};

if (!program.input) {
  console.log('$ itodo -i <folder>');
} else {
  // process stdin
  var input = path.resolve(program.input);
  var filterDir = program.filterDir && program.filterDir.split(',');
  console.log('项目路径：' + input);
  itodo.process(input, filterDir).then((list) => {
    if (list.length) {
      console.log('您项目的TODO列表项还有：' + list.length + '项');
      var lines = [['类型', '内容', '文件名:行']];
      list.forEach(function (item) {
        lines.push([item.type, truncate(item.item, 70), path.relative(input, item.filename) + ':' + item.lineno]);
      });
      console.log(pt.print(lines, ' | '));
    } else {
      console.log('恭喜您，项目的TODO列表为空');
    }
  }, (err) => {
    if (err) {
      console.log('扫描项目出现错误：');
      console.log(err);
      return;
    }
  });
}
