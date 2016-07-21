'use strict';

/**
 * ConfigurationError
 */
class ConfigurationError extends Error {}

/**
 * InvalidSchemaError
 */
class InvalidSchemaError extends ConfigurationError {
  constructor (msg) {
    super(msg)
    this.name = 'InvalidSchemaError'
  }
}

/**
 * UndefinedOptionError
 */
class UndefinedOptionError extends ConfigurationError {
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
  ConfigurationError,
  InvalidSchemaError,
  UndefinedOptionError
}
