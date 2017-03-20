/* global it */

const assert = require('assert')
const rdf = require('rdf-ext')
const Readable = require('readable-stream')

function expectError (p) {
  return new Promise((resolve, reject) => {
    Promise.resolve().then(() => {
      return p()
    }).then(() => {
      reject(new Error('no error thrown'))
    }).catch(() => {
      resolve()
    })
  })
}

function test (Sink, options) {
  options = options || {}

  it('should be a constructor', () => {
    assert.equal(typeof Sink, 'function')
  })

  it('should have a .import method', () => {
    let sink = new Sink()

    assert.equal(typeof sink.import, 'function')
  })

  if (options.readable) {
    it('.import should return a Stream instance', () => {
      let sink = new Sink()
      let input = new Readable()
      let stream = sink.import(input)

      assert(stream.readable)
    })
  }

  it('should forward the end event', () => {
    let input = new Readable()

    input._read = () => {
      input.push(null)
    }

    let sink = new Sink()
    let stream = sink.import(input)

    input.resume()
    stream.resume()

    return rdf.waitFor(stream)
  })

  it('should forward the error event', () => {
    let input = new Readable()

    input._read = () => {
      input.emit('error', new Error(''))
    }

    return expectError(() => {
      let sink = new Sink()
      let stream = sink.import(input)

      input.resume()
      stream.resume()

      return rdf.waitFor(stream)
    })
  })
}

module.exports = test
