'use strict'

let _ = require('underscore')
let Credential = require('./datastore').Credential
let Log = require('./datastore').Log
let User = require('./datastore').User

class Authorize {
  static get type() {
    return 'Authorize'
  }
  constructor(options, rfidReader, door) {
    this.door = door
    this.rfidReader = rfidReader
    rfidReader.on('read', (type, value) => {
      console.warn("LOG READ", type, value)
      this.validate(type, value)
    })
    door.on('open', () => {
      this.logDoorAction('open')
    })
    door.on('closed', () => {
      this.logDoorAction('closed')
    })
  }
  validate(type, value) {
    Credential.findOne({ where: { type: type, value: value }})
      .then((credential) => {
        let userId = _.result(credential, 'userId')
        if (userId) {
          this.logValid(type, credential, this.door.status())
          this.rfidReader.authorized()
          this.door.toggle()
        }
        else {
          this.logInvalid(type, value)
          this.rfidReader.unauthorized()
        }
      })
  }
  logValid(authType, credential, doorStatus) {
    Log.create({
      type: Authorize.type,
      message: 'VALID',
      data: {
        authType: authType,
        credentialId: credential.id,
        doorAction: doorStatus === 'open' ? 'closing' : 'opening'
      },
      userId: credential.userId
    })
  }
  logInvalid(authType, value) {
    Log.create({
      type: Authorize.type,
      message: 'INVALID',
      data: {
        authType: authType,
        value: value
      }
    })
  }
  logDoorAction(action) {
    Log.create({
      type: 'Door',
      message: action
    })
  }
}

module.exports = Authorize
