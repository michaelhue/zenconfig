'use strict';

const { InvalidSchemaError } = require('./errors')

/**
 * Schema types.
 * @type {Object}
 */
const types = {
  ARRAY: 'array',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  STRING: 'string'
}

/**
 * Converter functions.
 * @type {Object}
 */
const converters = {
  [types.ARRAY] (val) {
    return val.split(',').map(v => v.trim())
  },

  [types.BOOLEAN] (val) {
    return val === 'false' ? false : !!val
  },

  [types.NUMBER] (val) {
    return Number(val)
  },

  [types.STRING] (val) {
    return '' + val
  }
}

/**
 * Convert input to type.
 * @param {*} input – Input value.
 * @param {String} type – Output type.
 * @return {*} Converted value.
 * @throws {InvalidSchemaError} Type must be valid.
 */
function convert (input, type) {
  let converter = converters[type]

  if (converter === undefined) {
    throw new InvalidSchemaError(`Invalid type '${type}'`)
  }

  return converter(input)
}

/**
 * Schema module.
 * @type {Object}
 * @module zenconfig/lib/errors
 */
module.exports = {
  convert,
  types
}
