﷽

# Winston Transport for Residue

[![Version](https://img.shields.io/npm/v/residue-winston.svg)](https://www.npmjs.com/package/residue-winston)
[![GitHub license](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/zuhd-org/residue-winston/blob/master/LICENSE)

[![Donate](https://muflihun.github.io/donate.png?v2)](https://www.paypal.me/zuhd/25)

For options, please refer to [Residue for Node.js](https://github.com/zuhd-org/residue-node#connectoptions)

Simply enable the transport on winston

```javascript
const Residue = require('residue-winston');
const residue_internal = Residue.residue_internal;

// or import Residue, { residue_internal } from 'residue-winston';

const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new Residue({
        logger_id: 'sample-app',
        // following is optional, if config_file not provided
        // all these options are used as config
        config_file: 'path to config file'
    })
  ]
});

console.log(`Residue library version ${residue_internal.version()}-${residue_internal.type()}`);
```

## Use Residue Logger
You can also use mix of winston logger and residue logger when using `residue-winston` module.

```
const rlogger = residue_internal.getLogger('mylogger');
rlogger.info('this is object value: %s', {name: 'Adam', age: 960});
```

Learn more [here](https://github.com/zuhd-org/residue-node#usage)

## License
```
Copyright 2017-present Zuhd Web Services
Copyright 2017-present @abumusamq

https://github.com/zuhd-org/
https://zuhd.org
https://muflihun.com/

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
