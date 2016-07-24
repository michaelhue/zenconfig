'use strict';

const { convert } = require('./schema')
const {
  InvalidSchemaError,
  UndefinedOptionError
} = require('./errors')

/**
 * Extract a key from a source object.
 * @param {Object} src - Source object.
 * @param {string} key - Key name.
 * @param {Object} def - Key schema definition.
 * @param {string} [def.type=string] – Option type.
 * @param {*} [def.default] – Default value.
 * @return {*} Extracted and converted value.
 */
function extract (src, key, def) {
  const { type, default: fallback } = def
  const value = src[key]

  if (value === undefined && fallback !== undefined) {
    return fallback
  }

  if (value !== undefined) {
    return convert(value, type)
  }

  return undefined
}

/**
 * Create new configuration.
 * @param {Object} schema – Schema definition.
 * @param {...Object} options – User-defined options.
 * @return {Object} Immutable option object.
 * @throws {UndefinedOptionError} Options must not be undefined.
 */
function create (schema, ...options) {
  const set = Object.assign({}, ...options)
  const config = {}

  if (schema === undefined) {
    throw new InvalidSchemaError('schema is undefined')
  }

  Object.keys(schema).forEach(key => {
    const def = schema[key]
    const value = extract(set, key, def)

    if (value === undefined) {
      throw new UndefinedOptionError(key)
    }

    config[key] = value
  })

  return Object.freeze(config)
}

/**
 * Config module.
 * @type {Object}
 * @module zenconfig/lib/config
 */
module.exports = create
