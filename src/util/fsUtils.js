
exports.promisifyFsWithErrors = function promisifyFsWithErrors(method) {
  var promiseMethod =  Promise.promisify(method)
  return function promisifiedFsMethodWithErrors() {
    return promiseMethod.apply(null, arguments)
      .catch((e) => {

      });
  }
}

exports.errors = {};
exports.codeToErrorType = {};
exports.getErrorForCode = (code) => {
  return exports.codeToErrorType[code];
};

function makeErrorType(name, code) {
  function NewCoreFsError() {
    this.name = name;
  }

  exports.errors[name] = NewCoreFsError;
  exports.codeToErrorType[code] = NewCoreFsError;
}

