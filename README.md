# fetch-utils

[![Join the chat at https://gitter.im/zslucky/fetch-utils](https://badges.gitter.im/zslucky/fetch-utils.svg)](https://gitter.im/zslucky/fetch-utils?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/zslucky/fetch-utils.svg?branch=master)](https://travis-ci.org/zslucky/fetch-utils)
[![Coverage Status](https://coveralls.io/repos/github/zslucky/fetch-utils/badge.svg?branch=master)](https://coveralls.io/github/zslucky/fetch-utils?branch=master)
[![Inline docs](http://inch-ci.org/github/zslucky/fetch-utils.svg?branch=master)](http://inch-ci.org/github/zslucky/fetch-utils)

This is a configurabled lib for [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) that we can add a global default configuration for every requests, aslo provide some packed methods that we can do request more easily.

We are followed [SamVer 2.0](http://semver.org/), this started from version 2.0.0, then we will try our best to avoide the dependency hell.

---
### Install
```sh
npm i fetch-utils --save
```
Or use `yarn`
```sh
yarn add fetch-utils
```

### Usage
For configruation: (Every options please refer to [fetch](https://github.com/github/fetch))
```javascript
/*
 *  // the default setting, override it if necessary
 *  headers: {
 *      'Accept': 'application/json',
 *      'Content-Type': 'application/json'
 *  }
 */
import { setConfig } from 'fetch-utils';

class NotFoundError extends Error {}

const config = {
    /*
     * Can set the response type, default is json.
     * You can config it in any single request to override it.
     * Response type can be follows:
     *   json, text, formData, blob, arrayBuffer
     */
    responseType: 'json',
    errorHandlers: {
      404: NotFoundError
      // Other error.
    }
};

// This setting will reflect to every requests, it's a global setting.
setConfig(config);
```

For methods:
```javascript
import { doGet, doPut, doPost, doDelete } from 'fetch-utils';

// Every method will reture a Promise instance
const promise = doGet(param);
const promise = doPut(param);
const promise = doPost(param);
const promise = doDelete(param);

e.g.
/*
 * data type is defined by attribute `responseType`
 * err is instance of Error, can be all of child class which super class is Error
 */
promise
  .then(function(data) {
    //... the body data
  })
  .catch(function(error) {
    //... error object
  });
```

> `error` is an instance of Error, can be pass any child Error class which extends Error, if you are using `babel` to suppoert builtin extend, you should add `transform-builtin-extend` plugin for babel add config in `.babelrc` to add `Error` in global.

> `param` can be `string` or `object`.

1. `string`: the request url.

2. `object`: the request `option` that contain the url and other settings.

```javascript
// e.g.
// Get a user which id is 1.
doGet('http://www.yourdomain.com/api/v1/user/1?base=true&show=false');
// Delete a user which id is 1.
doDelete('http://www.yourdomain.com/api/v1/user1');

// the same
doGet({
    url: 'http://www.yourdomain.com/api/v1/user/1?base=true&show=false'
});

doDelete({
    url: 'http://www.yourdomain.com/api/v1/user/1'
});

doPut({
    url: 'http://www.yourdomain.com/api/v1/user/1',
    body: new FormData();
});

doPost({
    url: 'http://www.yourdomain.com/api/v1/user/1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    body: JSON.stringfy({
        name: 'newName'
    });
});

/*
 * multipart/form-data
 * single file example, multi-file is the same.
 */
var dataBean = new Blob(
  [JSON.stringify({user: 'user1'})],
  {type : 'application/json'}
);

var file = $('#file')[0].files[0];

var formData = new FormData();

formData.append('bean', dataBean);
formData.append('file', file);

// content-type can be ignored.
doPost({
    url: 'http://www.yourdomain.com/api/v1/user/1/upload',
    body: formData
});
```
