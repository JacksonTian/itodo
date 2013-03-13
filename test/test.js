var path = require('path');
var should = require('should');
var itodo = require('../');

describe('itodo', function () {
  it('should ok', function (done) {
    itodo.process(path.join(__dirname, './fixtures/'), function (err, list) {
      should.not.exist(err);
      list.should.have.length(2);
      list[0].should.have.property('type', 'TODO');
      list[0].should.have.property('item', '源文件');
      list[0].filename.should.include('fixtures/1.js');
      list[0].should.have.property('lineno', 2);
      list[1].should.have.property('type', 'FIXME');
      list[1].should.have.property('item', '同步深度遍历文件夹');
      list[1].filename.should.include('fixtures/1.js');
      list[1].should.have.property('lineno', 5);
      done();
    });
  });
});
