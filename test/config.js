'use strict';

const { test } = require('tap')
const config = require('../index')
const { UndefinedOptionError } = config

test('options', t => {
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

  t.deepEqual(actual, expected, 'set options')
  t.end()
})

test('missing options', t => {
  let schema = {
    HOST: { type: 'string' }
  }

  function expectThrow () {
    config(schema, {})
  }

  t.throws(expectThrow, UndefinedOptionError, 'throws error')
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

  t.equal(actual.HOST, 'localhost', 'default string')
  t.equal(actual.PORT, 8080, 'default number')
  t.equal(actual.ENABLE, true, 'default boolean')
  t.deepEqual(actual.ROLES, ['admin', 'user'], 'default array')
  t.end()
})

test('config object', t => {
  let schema = { TEST: { type: 'string' } }
  let obj = config(schema, { TEST: 'foo' })

  t.ok(!Object.isExtensible(obj), 'is not extensible')
  t.ok(Object.isFrozen(obj), 'is frozen')
  t.ok(obj.propertyIsEnumerable('TEST'), 'is enumerable')
  t.end()
})
