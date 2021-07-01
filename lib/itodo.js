'use strict';

const path = require('path');
const fs = require('fs');

const Walker = require('iwalk');

const reg = /(TODO|FIXME|HACK):(.*)/ig;

exports.parse = function (filename) {
  const text = fs.readFileSync(filename, 'utf8');
  let matched;
  const list = [];
  while ((matched = reg.exec(text))) {
    let count = matched.input.substring(0, matched.index).match(/\n/g);
    const lineno = count ? count.length + 1 : 1;
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

exports.process = function (folder, ignoresList = ['node_modules']) {
  return new Promise((resolve, reject) => {
    var list = [];
    var walker = new Walker();
    var ignoresReg = new RegExp('/(' + ignoresList.join('|') + ')/', 'ig');
    walker.on('file', function (filename) {
      if (filename.match(ignoresReg)) {
        return;
      }
      var ext = path.extname(filename);
      if (ext === '.js' || ext === '.ts' || ext === '') {
        list = list.concat(exports.parse(filename));
      }
    });
    walker.on('error', function (err) {
      walker.removeAllListeners('error');
      reject(err);
    });
    walker.on('end', function () {
      resolve(list);
    });
    walker.walk(folder);
  });
};

exports.version = require('../package.json').version;
