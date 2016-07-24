const test = require('tape')
const errors = require('./errors')

test('configuration error', t => {
  let msg = 'foo'
  let err = new errors.ConfigurationError(msg)

  t.ok(err instanceof Error, 'instance')
  t.equal(err.name, 'ConfigurationError', 'name')
  t.equal(err.message, msg, 'message')
  t.end()
})

test('invalid schema error', t => {
  let msg = 'foo'
  let err = new errors.InvalidSchemaError(msg)

  t.ok(err instanceof errors.ConfigurationError, 'instance')
  t.equal(err.name, 'InvalidSchemaError', 'name')
  t.equal(err.message, msg, 'message')
  t.end()
})

test('undefined option error', t => {
  let key = 'foo'
  let err = new errors.UndefinedOptionError(key)

  t.ok(err instanceof errors.ConfigurationError, 'instance')
  t.equal(err.name, 'UndefinedOptionError', 'name')
  t.ok(err.message.match(/foo/), 'message contains key')
  t.equal(err.key, key, 'exposes key')
  t.end()
})
