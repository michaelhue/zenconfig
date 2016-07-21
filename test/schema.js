const test = require('tape')
const config = require('../index')
const { InvalidSchemaError } = config

test('types exported', t => {
  t.plan(4)

  t.equal(config.ARRAY, 'array', 'ARRAY')
  t.equal(config.BOOLEAN, 'boolean', 'BOOLEAN')
  t.equal(config.NUMBER, 'number', 'NUMBER')
  t.equal(config.STRING, 'string', 'STRING')
})

test('string type conversion', t => {
  let actual, expected
  let schema = { TEST: { type: 'string' } }

  t.plan(5)

  actual = config(schema, { TEST: 'foobar' })
  expected = { TEST: 'foobar' }
  t.deepEqual(actual, expected, 'string remains')

  actual = config(schema, { TEST: 1 })
  expected = { TEST: '1' }
  t.deepEqual(actual, expected, 'string from integer (1)')

  actual = config(schema, { TEST: 1.75 })
  expected = { TEST: '1.75'}
  t.deepEqual(actual, expected, 'string from float (1.75)')

  actual = config(schema, { TEST: true })
  expected = { TEST: 'true' }
  t.deepEqual(actual, expected, 'string from boolean (true)')

  actual = config(schema, { TEST: false })
  expected = { TEST: 'false' }
  t.deepEqual(actual, expected, 'string from boolean (false)')
})

test('number type conversion', t => {
  let actual, expected
  let schema = { TEST: { type: 'number' } }

  t.plan(5)

  actual = config(schema, { TEST: 1 })
  expected = { TEST: 1 }
  t.deepEqual(actual, expected, 'number from integer (1)')

  actual = config(schema, { TEST: 1.75 })
  expected = { TEST: 1.75 }
  t.deepEqual(actual, expected, 'number from float (1.75)')

  actual = config(schema, { TEST: '10' })
  expected = { TEST: 10 }
  t.deepEqual(actual, expected, 'number from string (10)')

  actual = config(schema, { TEST: true })
  expected = { TEST: 1 }
  t.deepEqual(actual, expected, 'number from boolean (true)')

  actual = config(schema, { TEST: false })
  expected = { TEST: 0 }
  t.deepEqual(actual, expected, 'number from boolean (false)')
})

test('boolean type conversion', t => {
  let schema = { TEST: { type: 'boolean' } }
  let expectedTrue = { TEST: true }
  let expectedFalse = { TEST: false }
  let actual

  t.plan(6)

  actual = config(schema, { TEST: true })
  t.deepEqual(actual, expectedTrue, 'boolean remains (true)')

  actual = config(schema, { TEST: false })
  t.deepEqual(actual, expectedFalse, 'boolean remains (false)')

  actual = config(schema, { TEST: 0 })
  t.deepEqual(actual, expectedFalse, 'boolean from number (0)')

  actual = config(schema, { TEST: 1 })
  t.deepEqual(actual, expectedTrue, 'boolean from number (1)')

  actual = config(schema, { TEST: 'true' })
  t.deepEqual(actual, expectedTrue, 'boolean from string (\'true\')')

  actual = config(schema, { TEST: 'false' })
  t.deepEqual(actual, expectedFalse, 'boolean from string (\'false\')')
})

test('array type conversion', t => {
  let actual, expected
  let schema = { TEST: { type: 'array' } }

  t.plan(2)

  actual = config(schema, { TEST: 'foo,bar,baz' })
  expected = { TEST: ['foo', 'bar', 'baz'] }
  t.deepEqual(actual, expected, 'array from string')

  actual = config(schema, { TEST: ' foo, bar ,baz  ' })
  expected = { TEST: ['foo', 'bar', 'baz'] }
  t.deepEqual(actual, expected, 'trimmed values')
})

test('invalid type conversion', t  => {
  let schema = { TEST: { type: 'unknown' } }
  let op = () => config(schema, { TEST: null })

  t.plan(1)
  t.throws(op, InvalidSchemaError, 'throws exception')
})
