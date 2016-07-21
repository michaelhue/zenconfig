const config = require('./config')
const errors = require('./errors')
const { types } = require('./schema')

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
