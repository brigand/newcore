node core libs with promises and better errors

Currently just `fs` is supported.

    npm install --save newcore


## fs

Example:

```js
var fs = require('newcore/lib/fs');

fs.readFile('lorem.txt', 'utf-8')
.then((text) => {
  console.log(text);
})

// selective error handling
.catch(fs.errors.NotFound, () => {
  console.log('File lorem.txt is missing');
});
```

Errors:

Code       | Error Name
-----------|------------
EACCES     | fs.errros.PermissionDenied
EEXIST     | fs.errors.FileExists
EISDIR     | fs.errors.IsDirectory
ENOTDIR    | fs.errors.NotDirectory
ENOTEMPTY  | fs.errors.NotEmptyDirectory
ENOENT     | fs.errors.NotFound
EMFILE     | fs.errors.OutOfFileDescriptors
EPERM      | fs.errors.Permissions


## TODO

Add all of the apis mentioned here https://github.com/nodejs/node/pull/5020



