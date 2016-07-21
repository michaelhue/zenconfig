'use strict';

const { UndefinedOptionError } = require('./errors')
const { convert } = require('./schema')

/**
 * Extract a key from a source object.
 * @param {Object} src - Source object.
 * @param {string} key - Key name.
 * @param {Object} def - Key schema definition.
 * @param {string} [def.type=string] – Option type.
 * @param {*} [def.default] – Default value.
 * @return {*} Extracted and converted value.
 */
function extract (src, key, def = { type: 'string' }) {
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
 * Define a read-only property on an object.
 * @param {Object} obj – Target object.
 * @param {string} key – Property name.
 * @param {*} value – Property value.
 */
function define (obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    writable: false,
    value
  })
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

  for (let key in schema) {
    let def = schema[key]
    let value = extract(set, key, def)

    if (value === undefined) {
      throw new UndefinedOptionError(key)
    }

    define(config, key, value)
  }

  return config
}

/**
 * Config module.
 * @type {Object}
 * @module zenconfig/lib/config
 */
module.exports = create
