# quibble :heart: esm

This repo exists to
- :thinking: minimally reproduce an error observed when using quibble with esm enabled.
  - *It doesn't even use actual ES `import` syntax, because `require` works better for synchronous module loading in tests. However, the test cases show that esm is nevertheless showing up in the callstack*
- :white_check_mark: demonstrate a workaround

## TL;DR

The solution basically boils down to running this somewhere before your test suite.

```js
require('quibble').ignoreCallsFromThisFile(require.resolve('esm/esm'))
```

## Running
- `npm i`
- `npm test`

### Expected output
```
$ npm test

> quibble-plus-esm@1.0.0 test <your project dir>/quibble-plus-esm
> npm run test:cjs && npm run test:esm


> quibble-plus-esm@1.0.0 test:cjs <your project dir>/quibble-plus-esm
> node index.js

passed
passed
passed
passed

> quibble-plus-esm@1.0.0 test:esm <your project dir>/quibble-plus-esm
> NODE_OPTIONS='-r esm' node index.js

passed
<your project dir>/quibble-plus-esm/index.js:1
AssertionError [ERR_ASSERTION]: Input A expected to strictly equal input B:
+ expected - actual

- 'test test test'
+ 'successfully replaced once'
    at testReplaceWorksTheFirstTime (<your project dir>/quibble-plus-esm/index.js:34:10)
    at Object.<anonymous> (<your project dir>/quibble-plus-esm/index.js:14:1)
    at Generator.next (<anonymous>)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! quibble-plus-esm@1.0.0 test:esm: `NODE_OPTIONS='-r esm' node index.js`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the quibble-plus-esm@1.0.0 test:esm script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     ~/.npm/_logs/2019-01-21T22_14_32_338Z-debug.log
npm ERR! Test failed.  See above for more details.
```

## The Files
- `index.js` contains the test cases.
- `thrice.js` is the simple dependency we want to mock.
- `wrapped-thrice.js` is the simple module that depends on `thrice`.
