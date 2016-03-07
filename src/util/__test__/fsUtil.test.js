var {promisifyFsWithErrors, errors} = require('../fsUtils');
var {expect} = require('chai');

describe('fsUtils', () => {
  describe('promisifyFsWithErrors', () => {
    it('resolves', () => {
      return promisifyFsWithErrors((cb) => cb())();
    });

    it('rejects with the correct type', () => {
      return promisifyFsWithErrors((cb) => cb({code: 'ENOENT'}))()
        .then((x) => { throw x })
        .catch((e) => {
          if (!e instanceof errors.NotFound) {
            throw e;
          }
        });
    });
  });
});

