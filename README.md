byteskode-logger
=====================

[![Build Status](https://travis-ci.org/byteskode/byteskode-logger.svg?branch=master)](https://travis-ci.org/byteskode/byteskode-logger)

byteskode winston logger utility

*Note: logger is configured using [config](https://github.com/lorenwest/node-config)*

*Note: Ensure mongoose connection if you want to utilize mongoose transport*

## Installation
```sh
$ npm install --save byteskode-logger
```

## Usage

```javascript
var mongoose = require('mongoose');

//connect to mongoose if production environment

var Logger = require('byteskode-logger');

//obtain winston logger instance
var winston = Logger.logger;

//use winston logger instance
winston.info('<message>',{<metadata>});
winston.debug('<message>',{<metadata>});
winston.error('<message>',{<metadata>});
winston.warn('<message>',{<metadata>});

//use logger Log mongoose model(available only in production environment)
var Log = Logger.Log;

//use Log as other mongoose model
Log.find({}).exec(fn);
...

```

## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```

* Then run test
```sh
$ npm test
```

## Contribute
It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Licence
The MIT License (MIT)

Copyright (c) 2015 byteskode & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 