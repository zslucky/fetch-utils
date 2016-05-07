# fetch-utils
[![Build Status](https://travis-ci.org/zslucky/fetch-utils.svg?branch=master)](https://travis-ci.org/zslucky/fetch-utils)
[![Coverage Status](https://coveralls.io/repos/github/zslucky/fetch-utils/badge.svg?branch=master)](https://coveralls.io/github/zslucky/fetch-utils?branch=master)

This is a configurabled lib for [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) that we can add a global default configuration for every requests, aslo provide some packed methods that we can do request more easily.

---
### Install
```sh
npm i fetch-utils --save
```

### Usage
For configruation: (Every options please refer to [fetch](https://github.com/github/fetch))
```javascript
import { setConfig } from 'fetch-utils';

const config = {
    // ......
};

setConfig(config);
```

For methods:
```javascript
import { doGet, doPut, doPost, doDelete } from 'fetch-utils';

// Every method will reture a Promise instance
doGet(); 
doPut();
doPost();
doDelete();
```