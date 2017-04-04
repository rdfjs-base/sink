/* global describe, it */

const assert = require('assert')
const rdf = require('rdf-ext')
const test = require('.')
const Readable = require('readable-stream')
const Sink = require('..')

class TestStream extends Readable {
  constructor (input, options) {
    super()

    this.options = options

    input.on('end', () => {
      this.push(null)
    })
  }

  _read () {}
}

class TestSink extends Sink {
  constructor (options) {
    super(TestStream, options)
  }
}

describe('rdf-sink', () => {
  test(TestSink)

  it('should forward the constructor options', () => {
    let options = {a: '1'}
    let input = new Readable()

    input._read = () => {
      input.push(null)
    }

    let sink = new TestSink(options)
    let stream = sink.import(input)

    input.resume()
    stream.resume()

    return rdf.waitFor(stream).then(() => {
      assert.deepEqual(stream.options, options)
    })
  })

  it('should merge .import method options and constructor options', () => {
    let constructorOptions = {
      a: '1',
      b: '2'
    }

    let methodOptions = {
      b: '3',
      c: '4'
    }

    let mergedOptions = {
      a: '1',
      b: '3',
      c: '4'
    }

    let input = new Readable()

    input._read = () => {
      input.push(null)
    }

    let sink = new TestSink(constructorOptions)
    let stream = sink.import(input, methodOptions)

    input.resume()
    stream.resume()

    return rdf.waitFor(stream).then(() => {
      assert.deepEqual(stream.options, mergedOptions)
    })
  })
})
