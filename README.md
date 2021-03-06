# zenconfig

> Simple schema-based configuration for [twelve-factor](https://12factor.net) apps

[![npm](https://img.shields.io/npm/v/zenconfig.svg?style=flat-square)](https://www.npmjs.com/package/zenconfig)
[![Travis](https://img.shields.io/travis/michaelhue/zenconfig.svg?style=flat-square)](https://travis-ci.org/michaelhue/zenconfig)
[![Codecov](https://img.shields.io/codecov/c/github/michaelhue/zenconfig.svg?style=flat-square)](https://codecov.io/gh/michaelhue/zenconfig)
[![Code Climate](https://img.shields.io/codeclimate/github/michaelhue/zenconfig.svg?style=flat-square)](https://codeclimate.com/github/michaelhue/zenconfig)
![dependencies](https://img.shields.io/david/michaelhue/zenconfig.svg?style=flat-square)
[![license](https://img.shields.io/github/license/michaelhue/zenconfig.svg?style=flat-square)](./LICENSE)

_Note: this package is currently in beta._


## Features

- **12-factor ready:** encourages portable [configuration](https://12factor.net/config) via environment vars
- **Schema based:** define options via json compatible schema
- **Independent**: look ma, no dependencies
- **Immutable:** creates a read-only config object for your sanity 

## Install

```bash
npm install zenconfig
```


## Usage

```js
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
const config = zenconfig(schema, process.env)
```


## License

This software is released under the MIT license, see [LICENSE](./LICENSE).
