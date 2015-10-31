'use strict'

let Datastore = require('./lib/datastore')
let Authorize = require('./lib/authorize')
let RfidReader = require('./lib/rfid_reader')
let routes = require('./lib/routes')

let register = function(server, options, next) {
  server.expose('datastore', Datastore)

  let rfidReader = new RfidReader(options)
  server.expose('rfidReader', rfidReader)

  let door = server.plugins['garage_door_core']['door']
  let authorize = new Authorize(options, rfidReader, door)
  server.expose('authorize', authorize)

  routes(server)

  return next()
}

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register
