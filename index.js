#!/usr/bin/env node

const assert = require('assert').strict
const quibble = require('quibble')

// Demonstrates that ignoring esm/esm will fix the issue.
// Uncomment the next line to see the tests pass.
// require('quibble').ignoreCallsFromThisFile(require.resolve('esm/esm'))

// *** Unfancy Test Runner ***
testOriginal()

// This test will fail unless we force quibble to ignore esm in the callstack.
testReplaceWorksTheFirstTime()

quibble.reset()

testResetRestoresOriginalDependency()
testReplaceWorksAfterReset()

// *** Unfancy Tests ***
function testOriginal () {
  const subject = require('./wrapped-thrice')

  assert.equal(subject('test'), 'test test test')

  console.log('passed')
}

function testReplaceWorksTheFirstTime () {
  quibble('./thrice', () => 'successfully replaced once')
  const subject = require('./wrapped-thrice')

  assert.equal(subject('test'), 'successfully replaced once')

  console.log('passed')
}

function testResetRestoresOriginalDependency () {
  const subject = require('./wrapped-thrice')

  assert.equal(subject('test'), 'test test test')

  console.log('passed')
}

function testReplaceWorksAfterReset () {
  quibble('./thrice', () => 'successfully replaced twice')
  const subject = require('./wrapped-thrice')

  assert.equal(subject('test'), 'successfully replaced twice')

  console.log('passed')
}
