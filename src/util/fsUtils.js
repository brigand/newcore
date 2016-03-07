var Promise = require('bluebird');

exports.promisifyFsWithErrors = function promisifyFsWithErrors(method) {
  var promiseMethod = Promise.promisify(method);

  return function promisifiedFsMethodWithErrors() {
    return promiseMethod.apply(null, arguments)
      .catch((e) => {
        var ErrorType = exports.getErrorForCode(e.code);
        if (!ErrorType) return Promise.reject(e); 
        return Promise.reject(new ErrorType(e));
      });
  }
}

exports.errors = {};
exports.codeToErrorType = {};
exports.getErrorForCode = (code) => {
  return exports.codeToErrorType[code];
};

makeErrors({
  EACCES: 'PermissionDenied',
  EEXIST: 'FileExists',
  EISDIR: 'IsDirectory',
  ENOTDIR: 'NotDirectory',
  ENOTEMPTY: 'NotEmptyDirectory',
  ENOENT: 'NotFound',
  EMFILE: 'OutOfFileDescriptors',
  EPERM: 'Permissions',
});

function makeErrors(mapping) {
  Object.keys(mapping).forEach((code) => makeErrorType(mapping[code], code));
}

function makeErrorType(name, code) {
  function NewCoreFsError(error) {
    this.name = name;
    this.message = error.message;
    this.code = code;
    this.stack = error.stack || (new Error()).stack;
  }

  // Inheriting from Error is required by bluebird
  Object.setPrototypeOf(NewCoreFsError, Error);
  NewCoreFsError.prototype = Object.create(Error.prototype);

  exports.errors[name] = NewCoreFsError;
  exports.codeToErrorType[code] = NewCoreFsError;

  Object.defineProperty(NewCoreFsError, 'name', {
    configurable: true,
    value: 'NewCoreFsError' + name,
  });
}

