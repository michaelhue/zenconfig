'use strict';

const tap = require('tap')
const factory = require('./factory')

tap.test('function', t => {
  let schema = { TEST: { type: 'string' } }
  let expected = { TEST: 'foo' }
  let actual = factory(schema, expected)

  t.deepEqual(actual, expected)
  t.end()
})

tap.test('types', t => {
  t.equal(factory.ARRAY, 'array', 'ARRAY')
  t.equal(factory.BOOLEAN, 'boolean', 'BOOLEAN')
  t.equal(factory.NUMBER, 'number', 'NUMBER')
  t.equal(factory.STRING, 'string', 'STRING')
  t.end()
})
