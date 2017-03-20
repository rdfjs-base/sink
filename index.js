class Sink {
  constructor (Impl, options) {
    this.Impl = Impl
    this.options = options
  }

  import (input) {
    let output = new this.Impl(input, this.options)

    input.on('end', () => {
      if (output.readable) {
        output.push(null)
      } else {
        output.emit('end')
      }
    })

    input.on('error', (err) => {
      output.emit('error', err)
    })

    return output
  }
}

module.exports = Sink
