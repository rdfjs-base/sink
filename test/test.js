/* global describe */

const test = require('.')
const Readable = require('readable-stream')
const Sink = require('..')

class TestSink extends Sink {
  constructor () {
    super(Readable)
  }
}

describe('rdf-sink', () => {
  test(TestSink)
})
