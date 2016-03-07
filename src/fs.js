var fsCore = require('fs');
var Promise = require('bluebird');
var {promisifyFsWithErrors, errors} = require('./util/fsUtils');

var fs = module.exports = {};
fs.errors = errors;

Object.keys(fsCore).forEach((name) => {
  if (name.slice(-4) === 'Sync') {
    fs[name] = fsCore[name];
  }
  else if (typeof fsCore[name] === 'function') {
    fs[name] = promisifyFsWithErrors(fsCore[name]);
  }
});

