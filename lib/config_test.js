'use strict';

const { test } = require('tap')
const config = require('./config')
const { UndefinedOptionError } = require('./errors')

test('valid options', t => {
  let schema = {
    HOST: { type: 'string' },
    PORT: { type: 'number' },
    ENABLE: { type: 'boolean' },
    ROLES: { type: 'array' }
  }
  let options = {
    HOST: 'localhost',
    PORT: '8080',
    ENABLE: 'true',
    ROLES: 'admin,staff,user'
  }

  let actual = config(schema, options)
  let expected = {
    HOST: 'localhost',
    PORT: 8080,
    ENABLE: true,
    ROLES: ['admin', 'staff', 'user']
  }

  t.deepEqual(actual, expected, 'return options')
  t.end()
})

test('missing options', t => {
  let schema = {
    HOST: { type: 'string' }
  }

  function illegal () {
    config(schema, {})
  }

  t.throws(illegal, UndefinedOptionError, 'throw error')
  t.throws(illegal, /HOST/, 'mention key')
  t.end()
})

test('defaults', t => {
  let schema = {
    HOST: { type: 'string', default: 'localhost' },
    PORT: { type: 'number', default: 8080 },
    ENABLE: { type: 'boolean', default: true },
    ROLES: { type: 'array', default: ['admin', 'user'] }
  }
  let actual = config(schema, {})

  t.equal(actual.HOST, 'localhost', 'use default string')
  t.equal(actual.PORT, 8080, 'use default number')
  t.equal(actual.ENABLE, true, 'use default boolean')
  t.deepEqual(actual.ROLES, ['admin', 'user'], 'use default array')
  t.end()
})

test('config object', t => {
  let schema = { TEST: { type: 'string' } }
  let obj = config(schema, { TEST: 'foo' })

  t.notOk(Object.isExtensible(obj), 'not extensible')
  t.ok(Object.isFrozen(obj), 'frozen')
  t.ok(obj.propertyIsEnumerable('TEST'), 'enumerable')
  t.end()
})
