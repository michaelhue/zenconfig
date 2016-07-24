'use strict';

const config = require('./config')
const errors = require('./errors')
const schema = require('./schema')

/**
 * Public factory function.
 * @param {...*} args – Pass-through arguments.
 * @return {Object} Configuration object.
 */
function factory(...args) {
  return config(...args)
}

// Attach errors/types.
Object.assign(factory, errors, schema.types)

/**
 * Zenconfig module.
 * @module zenconfig
 */
module.exports = factory
