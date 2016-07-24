# zenconfig

> Simple schema-based configuration for [twelve-factor](https://12factor.net) apps in [Node.js](http://nodejs.org/)

[![npm](https://img.shields.io/npm/v/zenconfig.svg)](https://www.npmjs.com/package/zenconfig)
[![Travis](https://img.shields.io/travis/michaelhue/zenconfig.svg)](https://travis-ci.org/michaelhue/zenconfig)
[![Codecov](https://img.shields.io/codecov/c/github/michaelhue/zenconfig.svg)](https://codecov.io/gh/michaelhue/zenconfig)
![dependencies](https://img.shields.io/david/michaelhue/zenconfig.svg)
[![license](https://img.shields.io/github/license/michaelhue/zenconfig.svg)](./LICENSE)

_Note: this package is currently in beta._


## Philosophy

- **12-factor ready:** encourages portable [configuration](https://12factor.net/config) via environment vars.
- **Schema based:** define options via simple json-like schema.
- **Independent**: look ma, no dependencies!
- **Immutable:** creates a read-only config object for your sanity.
- **Strict:** undefined options throw errors.


## Install

```bash
npm install zenconfig
```

**Note:** Node.js version >= 6.0 is required for advanced ES2015 support.


## Example

```js
// lib/config.js
const zenconfig = require('zenconfig')

// Define configuration schema
const schema = {
  "NODE_ENV": {
    "type": "string",
    "default": "development"
  },
  "PORT": {
    "type": "number",
    "default": 8080
  },
  "HOST": {
    "type": "string"
  }
}

// Create immutable configuration from environment
module.exports = zenconfig(schema, process.env)
```


## Usage

```js
const config = zenconfig(schema, options [, ...options])
```


### Schema

Available configuration options are defined using a simple schema inspired by [JSON Schema](http://json-schema.org).

```js
const schema = {
  "OPTION_NAME": {
    "type": "array|boolean|number|string",
    "default": "[optional default value]",
    "help": "[optional help text]"
  }
}
```

The schema is a plain object with option names as keys with additional properties.

- **`type`:** required option value type. possible values:
  - `array`: converts comma-separated value to `Array`
  - `boolean`: converts option to `Boolean`
  - `number`: converts option to `Number`
  - `string`: converts option to `String`
- **`default`:** optional default value. undefined options without default value will throw an error when creating configuration.
- **`help`:** optional help text for option. (currently  unused.)

It is recommended to mirror environment variable names with keys in `UPPERCASE_UNDERSCORED` format. Nested keys are not supported by design.


### Options

The actual option values are passed as a plain object with option/value pairs. This makes passing environment variables as options very easy:

```js
const zenconfig = require('zenconfig')
const schema = {
  "PORT": { "type": "number", "default": 8080 },
  "HOST": { "type": "string", "default": "localhost" }
}

const config = zenconfig(schema, process.env)
```

While using evironment variables is recommended, you can also pass a custom object (useful in testing environments):

```js
const options = {
  PORT: 3000,
  HOST: 'example.org'
}

const config = zenconfig(schema, options)
```

You may even provide multiple option objects. They will be merged using [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) before being applied:

```js
const options = {
  HOST: 'example.org'
}

const config = zenconfig(schema, process.env, options)
```


### Errors

The module is pretty strict when it comes to schema definition and missing option values. The following errors may be thrown during configuration:

- **`ConfigurationError`:** base for all errors thrown by zenconfig
- **`InvalidSchemaError`:** thrown when the defined schema contains errors
- **`UndefinedOptionError`:** thrown when an option without default value is `undefined`

It is recommended to at least catch and handle the base `ConfigurationError` according to your application's needs. Check the complete example below:

```js
const zenconfig = require('zenconfig')
const {
  ConfigurationError,
  InvalidSchemaError,
  UndefinedOptionError
} = zenconfig

let config

try {
  config = zenconfig(schema, process.env)
} catch (InvalidSchemaError err) {
  // schema is invalid
} catch (UndefinedOptionError err) {
  // option without default value is undefined
} catch (ConfigurationError err) {
  // any other configuration error
}
```


## License

This software is released under the MIT license, see [LICENSE](./LICENSE).
