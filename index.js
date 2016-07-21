const config = require('./lib/config')
const errors = require('./lib/errors')
const { types } = require('./lib/schema')

/**
 * Public factory function.
 * @param {...*} args
 * @return {Object}
 */
function factory(...args) {
  return config(...args)
}

// Attach errors/types.
Object.assign(factory, errors, types)

/**
 * Zenconfig module.
 * @module zenconfig
 */
module.exports = factory
