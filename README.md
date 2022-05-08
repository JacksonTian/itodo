itodo (爱土豆)
======================

[![NPM version][npm-image]][npm-url]
[![build status][build-image]][build-url]
[![codecov][cov-image]][cov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/itodo.svg?style=flat-square
[npm-url]: https://npmjs.org/package/itodo
[build-image]: https://github.com/JacksonTian/itodo/actions/workflows/node.js.yml/badge.svg?branch=master
[build-url]: https://github.com/JacksonTian/itodo/actions/workflows/node.js.yml
[cov-image]: https://codecov.io/gh/JacksonTian/itodo/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/JacksonTian/itodo
[david-image]: https://img.shields.io/david/JacksonTian/itodo.svg?style=flat-square
[david-url]: https://david-dm.org/JacksonTian/itodo
[download-image]: https://img.shields.io/npm/dm/itodo.svg?style=flat-square
[download-url]: https://npmjs.org/package/itodo


你也许喜欢随手写下TODO项：

```
// TODO: 不要忘记fix掉这个bug
```

但是你是否会完成您的承诺，在未来的某一天回头fix掉这个潜在的bug呢？没关系，itodo帮你记下您的TODO列表，并提醒你。

## 安装先

```sh
$ npm install itodo -g
```

## 如何用？

```
itodo --help // 一目了然所有相关命令
```
是的，最简单的用法就是`itodo -i <某个项目>`。生成结果如下：

```sh
my_datavjs jacksontian $itodo -i .
项目路径：/Users/jacksontian/git/itodo
您项目的TODO列表项还有：3项
类型 | 内容                                     | 行 | 文件名                                                                            
TODO | 还需要过滤node_modules目录下的文件       | 32 | /Users/jacksontian/git/itodo/lib/itodo.js                                         
hack | check for the v0.6.x "data" event        | 69 | /Users/jacksontian/git/itodo/node_modules/commander/node_modules/keypress/index.js
hack | check for the v0.6.x "newListener" event | 78 | /Users/jacksontian/git/itodo/node_modules/commander/node_modules/keypress/index.js
```

## 省略文件夹

`itodo --filterDir "dir1,dir2"  -i <某个项目>`

默认等同 `itodo --filterDir "node_modules,.git,build,dist"  -i <某个项目>`


## 手工调用

```js
const itodo = require('itodo');

console.log('项目路径：' + input);
itodo.process(input).then((list) => {
  if (list.length) {
    console.log('您项目的TODO列表项还有：' + list.length + '项');
    var lines = [['类型', '内容', '文件名:行']];
    list.forEach(function (item) {
      lines.push([item.type, item.item, path.relative(input, item.filename) + ':' + item.lineno]);
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
```

## 爱土豆的贡献者们

```sh
$ git summary

 project  : itodo
 repo age : 9 years
 active   : 8 days
 commits  : 23
 files    : 10
 authors  : 
    22  Jackson Tian  95.7%
     1  dead-horse    4.3%
```

## License
The MIT license
