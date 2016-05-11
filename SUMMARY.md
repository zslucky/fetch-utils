# fetch-utils
[![Build Status](https://travis-ci.org/zslucky/fetch-utils.svg?branch=master)](https://travis-ci.org/zslucky/fetch-utils)
[![Coverage Status](https://coveralls.io/repos/github/zslucky/fetch-utils/badge.svg?branch=master)](https://coveralls.io/github/zslucky/fetch-utils?branch=master)
[![Inline docs](http://inch-ci.org/github/zslucky/fetch-utils.svg?branch=master)](http://inch-ci.org/github/zslucky/fetch-utils)

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
promise
  .then(function(response) {
    // Or returen response.text();
    return response.json();
  })
  .then(function(data) {
    //... the body data
  })
  .catch(function(err) {
    //... err object
  });
```

`param` can be `string` or `object`.

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
