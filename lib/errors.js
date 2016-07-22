'use strict';

/**
 * Configuration error
 * @param {String} msg – Error message.
 */
const ConfigurationError = err(function ConfigurationError (msg) {
  this.message = msg
}, Error)

/**
 * Invalid schema error
 * @param {String} msg – Error message.
 */
const InvalidSchemaError = err(function InvalidSchemaError (msg) {
  this.message = msg
}, ConfigurationError)

/**
 * Undefined option error
 * @param {String} key – Missing option key.
 */
const UndefinedOptionError = err(function UndefinedOptionError (key) {
  this.message = `${key} is undefined`
}, ConfigurationError)

/**
 * Error factory.
 * @param {Function} fn - Error handler.
 * @param {Error} base - Error base.
 * @return {Function}
 */
function err (fn, base) {
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
  ConfigurationError,
  InvalidSchemaError,
  UndefinedOptionError
}
