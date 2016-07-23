'use strict';

const { test } = require('tap')
const factory = require('./factory')

test('function', t => {
  let schema = { TEST: { type: 'string' } }
  let expected = { TEST: 'foo' }
  let actual = factory(schema, expected)

  t.deepEqual(actual, expected)
  t.end()
})

test('types', t => {
  let f = factory

  t.equal(f.ARRAY, 'array', 'expose array type')
  t.equal(f.BOOLEAN, 'boolean', 'expose boolean type')
  t.equal(f.NUMBER, 'number', 'expose number type')
  t.equal(f.STRING, 'string', 'expose string type')
  t.end()
})

test('errors', t => {
  let f = factory

  t.ok(new f.ConfigurationError() instanceof Error, 'expose configuration error')
  t.ok(new f.UndefinedOptionError() instanceof Error, 'expose undefined option error')
  t.ok(new f.InvalidSchemaError() instanceof Error, 'expose invalid schema error')
  t.end()
})
