'use strict';

/**
 * InvalidSchemaError
 */
class InvalidSchemaError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'InvalidSchemaError'
  }
}

/**
 * UndefinedOptionError
 */
class UndefinedOptionError extends Error {
  constructor (key) {
    super(`${key} is undefined`)
    this.name = 'UndefinedOptionError'
  }
}

/**
 * Errors module.
 * @type {Object}
 * @module zenconfig/lib/errors
 */
module.exports = {
  InvalidSchemaError,
  UndefinedOptionError
}
