var Promise = require('bluebird');
var fs = require('../fs');

Promise.resolve().then(() => {
  return fs.writeFile('/tmp/x.txt', 'Hello, world!');
})
.then(() => {
  return fs.mkdir('/tmp/x.txt')
})
.catch(fs.errors.FileExists, (e) => {
  console.log('It already exists, \n  ' + e.message);
})
.then(() => {
  return fs.readFile('does-not-exist.txt');
})
.catch(fs.errors.NotFound, (e) => {
  console.log('File not found, \n  ' + e.message);
});

