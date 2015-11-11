'use strict'

let Gpio = require('onoff').Gpio
let NanoTimer = require('nanotimer')
let _ = require('underscore')
let EventEmitter = require('events').EventEmitter

class RfidReader extends EventEmitter {
  constructor(options) {
    super()
    console.log("RfidReader: Starting...")
    this.setupReader(options.pins)
    this.setupOutputPins(options.pins)
    console.log("RfidReader: Started")
  }
  get type() {
    return 'RFID'
  }
  setupReader(pins) {
    this.timer = new NanoTimer()
    this.resetData()
    this.setupDataPin(pins.data_0, 0)
    this.setupDataPin(pins.data_1, 1)
    console.log("Setup reader: ", pins)
  }
  setupDataPin(pinNumber, pinValue) {
    let pin = new Gpio(pinNumber, 'in', 'falling')
    pin.watch((err, value) => {
      this.data[this.index] = pinValue
      this.index++
      this.timer.clearTimeout()
      this.timer.setTimeout(this.check, [this], '50m')
    })
  }
  setupOutputPins(pins) {
    this.greenLed = this.setupOutputPin(pins.greenLed)
    this.redLed = this.setupOutputPin(pins.redLed)
    this.buzzer = this.setupOutputPin(pins.buzzer)
    this.greenLed.writeSync(1)
    this.redLed.writeSync(1)
    this.buzzer.writeSync(1)
  }
  setupOutputPin(pin) {
    return new Gpio(pin, 'out')
  }
  check(context) {
    let data = context.data
    let index = context.index
    context.resetData()

    // var valid = true
    // var facility = null
    // var card = null
    // if (index != 26) {
    //   valid = false // incorrect size for expected 26bit format
    // } else {
    //   facility = parseInt(data.slice(1, 9).join(''), 2)
    //   card = parseInt(data.slice(9, 25).join(''), 2)
    //   if (data[0] != (facility % 2)) valid = false // bad facility parity
    //   else if (data[25] != (card % 2)) valid = false // bad card parity
    // }
console.warn("READDDD", data.join(''))
    context.emit('read', context.type, data.join(''))
  }
  resetData() {
    this.index = 0
    this.data = new Array(100)
  }
}

module.exports = RfidReader
