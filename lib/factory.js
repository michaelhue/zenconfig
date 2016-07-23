'use strict';

const config = require('./config')
const errors = require('./errors')
const schema = require('./schema')

/**
 * Public factory function.
 * @param {...*} args
 * @return {Object}
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
