itodo (爱土豆)
======================

你也许喜欢随手写下TODO项：

```
// TODO: 不要忘记fix掉这个bug
```

但是你是否会完成您的承诺，在未来的某一天回头fix掉这个潜在的bug呢？没关系，itodo帮你记下您的TODO列表，并提醒你。

## 安装先

```
npm install itodo -g
```

## 如何用？

```
itodo --help // 一目了然所有相关命令
```
是的，最简单的用法就是`itodo -i <某个项目>`。生成结果如下：

```
my_datavjs jacksontian $itodo -i .
项目路径：/Users/jacksontian/git/itodo
您项目的TODO列表项还有：3项
类型 | 内容                                     | 行 | 文件名                                                                            
TODO | 还需要过滤node_modules目录下的文件       | 32 | /Users/jacksontian/git/itodo/lib/itodo.js                                         
hack | check for the v0.6.x "data" event        | 69 | /Users/jacksontian/git/itodo/node_modules/commander/node_modules/keypress/index.js
hack | check for the v0.6.x "newListener" event | 78 | /Users/jacksontian/git/itodo/node_modules/commander/node_modules/keypress/index.js
```

## 手工调用

```
var itodo = require('itodo');

itodo.process(input, function (err, list) {
  console.log("项目路径：" + input);
  if (err) {
    console.log("扫描项目出现错误：");
    console.log(err);
    return;
  }
  if (list.length) {
    console.log("您项目的TODO列表项还有：" + list.length + "项");
    console.log('类型\t|内容\t\t\t\t|行\t|文件名\t\t');
    list.forEach(function (item) {
      console.log('---------------------------------------------------------------------');
      console.log([item.type, item.item, item.lineno, item.filename].join('\t|'));
    });
  } else {
    console.log("恭喜您，项目的TODO列表为空");
  }
});
```
## 爱土豆的贡献者们

```

 project  : itodo
 repo age : 26 hours
 active   : 2 days
 commits  : 10
 files    : 6
 authors  : 
     9	Jackson Tian            90.0%
     1	dead-horse              10.0%

```

## License
MIT
