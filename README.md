# zenconfig

> Simple schema-based configuration for twelve-factor apps

[![Travis](https://img.shields.io/travis/michaelhue/zenconfig.svg?maxAge=2592000&style=flat-square)](https://travis-ci.org/michaelhue/zenconfig)
[![license](https://img.shields.io/github/license/michaelhue/zenconfig.svg?maxAge=2592000&style=flat-square)](./LICENSE)

_Note: this package is currently in beta._


## Features

- **[12-factor](http://12factor.net/config) ready:** encourages clean configuration via environment vars
- **Schema-based:** define options via json compatible schema
- **Immutable:** creates a read-only config object for your sanity 


## Install

    npm install zenconfig


## Usage

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


## License

This software is released under the MIT license, see [LICENSE](./LICENSE).
