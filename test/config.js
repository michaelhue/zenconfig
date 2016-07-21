const test = require('tape')
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

  t.plan(1)
  t.deepEqual(actual, expected, 'set options')
})

test('missing options', t => {
  let schema = {
    HOST: { type: 'string' }
  }

  function expectThrow () {
    config(schema, {})
  }

  t.plan(1)
  t.throws(expectThrow, UndefinedOptionError, 'throws error')
})

test('defaults', t => {
  let schema = {
    HOST: { type: 'string', default: 'localhost' },
    PORT: { type: 'number', default: 8080 },
    ENABLE: { type: 'boolean', default: true },
    ROLES: { type: 'array', default: ['admin', 'user'] }
  }
  let actual = config(schema, {})

  t.plan(4)
  t.equal(actual.HOST, 'localhost', 'default string')
  t.equal(actual.PORT, 8080, 'default number')
  t.equal(actual.ENABLE, true, 'default boolean')
  t.deepEqual(actual.ROLES, ['admin', 'user'], 'default array')
})

test('immutability', t => {
  let schema = { TEST: { type: 'string' } }
  let obj = config(schema, { TEST: 'foo' })

  // simulate strict assignment
  function strictIllegalAssign () {
    'use strict';
    obj.TEST = 'bar'
  }

  t.plan(2)
  t.throws(strictIllegalAssign, TypeError, 'throw on strict illegal assign')
  t.deepEqual(obj, { TEST: 'foo' }, 'ignore write')
})
