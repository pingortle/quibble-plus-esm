# quibble :heart: esm
This repo exists to
- :thinking: minimally reproduce an error observed when using quibble with esm enabled.
- :white_check_mark: demonstrate a workaround

## TL;DR
```js
require('quibble').ignoreCallsFromThisFile(require.resolve('esm/esm'))
```

The solution basically boils down to running this somewhere before your test suite. This *should* work with testdouble.js as well.

## Running
- `npm install && npm test` - first time
- More options
  - `npm run test:cjs` - runs the suite in CommonJS mode
  - `npm run test:esm` - runs the suite with esm enabled (e.g. with the `-r esm` flag)

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

...
```

## The Files
- `index.js` contains the test cases.
- `thrice.js` is the simple dependency we want to mock.
- `wrapped-thrice.js` is the simple module that depends on `thrice`.

## Extra Info
These tests don't use actual ES `import` syntax, because `require` works better for synchronous module loading in tests. However, the test cases show that esm is nevertheless showing up in the callstack
