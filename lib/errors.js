'use strict';

/**
 * Configuration error
 * @param {String} msg – Error message.
 */
function ConfigurationError (msg) {
  this.message = msg
}

/**
 * Invalid schema error
 * @param {String} msg – Error message.
 */
function InvalidSchemaError (msg) {
  this.message = msg
}

/**
 * Undefined option error
 * @param {String} key – Missing option key.
 */
function UndefinedOptionError (key) {
  this.message = `${key} is undefined`
}

/**
 * Error factory.
 * @param {Function} fn - Error handler.
 * @param {Error} base - Error base.
 * @return {Function}
 */
function factory (fn, base) {
  fn.prototype = new base()
  fn.prototype.name = fn.name

  return fn
}

/**
 * Errors module.
 * @type {Object}
 * @module zenconfig/lib/errors
 */
module.exports = {
  ConfigurationError: factory(ConfigurationError, Error),
  InvalidSchemaError: factory(InvalidSchemaError, ConfigurationError),
  UndefinedOptionError: factory(UndefinedOptionError, ConfigurationError)
}
