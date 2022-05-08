'use strict';

const assert = require('assert');
const path = require('path');
const itodo = require('../lib/itodo');

describe('itodo', function () {
  it('should ok', async function () {
    const list = await itodo.process(path.join(__dirname, './fixtures/base'));
    assert.strictEqual(list.length, 2);
    assert.strictEqual(list[0].type, 'TODO');
    assert.strictEqual(list[0].item, '源文件');
    assert.ok(list[0].filename.endsWith('fixtures/base/1.js'));
    assert.strictEqual(list[0].lineno, 2);
    assert.strictEqual(list[1].type, 'FIXME');
    assert.strictEqual(list[1].item, '同步深度遍历文件夹');
    assert.ok(list[1].filename.endsWith('fixtures/base/1.js'));
    assert.strictEqual(list[1].lineno, 5);
  });

  it('should filter default directories', async function () {
    const list = await itodo.process(
      path.join(__dirname, './fixtures/filterDir'),
    );
    assert.strictEqual(list.length, 2);
    assert.strictEqual(list[0].type, 'TODO');
    assert.strictEqual(list[0].item, '源文件');
    assert.ok(list[0].filename.endsWith('fixtures/filterDir/a/1.js'));
    assert.strictEqual(list[0].lineno, 2);
    assert.strictEqual(list[1].type, 'FIXME');
    assert.strictEqual(list[1].item, '同步深度遍历文件夹');
    assert.ok(list[1].filename.endsWith('fixtures/filterDir/a/1.js'));
    assert.strictEqual(list[1].lineno, 5);
  });

  it('should filter directories optionally', async function () {
    const list = await itodo.process(
      path.join(__dirname, './fixtures/filterDir'),
      ['a','build']
    );
		assert.strictEqual(list.length, 2);
    assert.strictEqual(list[0].type, 'TODO');
    assert.strictEqual(list[0].item, '源文件');
		assert.ok(list[0].filename.endsWith('fixtures/filterDir/dist/1.js'));
		assert.strictEqual(list[0].lineno, 2);
    assert.strictEqual(list[1].type, 'FIXME');
    assert.strictEqual(list[1].item, '同步深度遍历文件夹');
    assert.ok(list[1].filename.endsWith('fixtures/filterDir/dist/1.js'));
    assert.strictEqual(list[1].lineno, 5);
  });
});
