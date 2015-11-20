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

    context.emit('read', context.type, data.join(''))
  }
  resetData() {
    this.index = 0
    this.data = new Array(100)
  }
  authorized() {
    this.greenLed.writeSync(0)
    let timer = new NanoTimer()
    timer.setTimeout(() => this.greenLed.writeSync(1), [], '1s')
  }
  unauthorized() {
    this.redLed.writeSync(0)
    this.buzzer.writeSync(0)
    let timer = new NanoTimer()
    timer.setTimeout(() => {
      this.redLed.writeSync(1)
      this.buzzer.writeSync(1)
    }, [], '1s')
  }
}

module.exports = RfidReader
