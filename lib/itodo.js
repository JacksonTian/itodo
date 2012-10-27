var path = require('path');
var fs = require('fs');

var Walker = require('iwalk');

var ignores = ['node_modules'];
var reg = /(TODO|FIXME|HACK):(.*)/ig;

exports.parse = function (filename) {
  var text = fs.readFileSync(filename);
  var matched;
  var list = [];
  while ((matched = reg.exec(text))) {
    var count = matched.input.substring(0, matched.index).match(/\n/g);
    var lineno = count ? count.length + 1 : 1;
    list.push({
      type: matched[1],
      item: matched[2].trim(),
      filename: filename,
      index: matched.index,
      lineno: lineno
    });
  }
  return list;
};

exports.process = function (folder, ignoresList, callback) {
  if (!callback) {
    callback = ignoresList;
    ignoresList = ignores;
  }
  var list = [];
  var walker = new Walker();
  var ignoresReg = new RegExp('\/(' + ignoresList.join('|') + ')\/', "ig");
  walker.on('file', function (filename) {
    if (filename.match(ignoresReg)) {
      return;
    }
    if (path.extname(filename) === '.js') {
      list = list.concat(exports.parse(filename));
    }
  });
  walker.on('error', function (err) {
    walker.removeAllListeners('error');
    callback(err);
  });
  walker.on('end', function () {
    callback(null, list);
  });
  walker.walk(folder);
};

exports.version = require('../package.json').version;
