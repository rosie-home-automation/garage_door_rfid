var Boom = require('boom')
var Log = require('./datastore').Log

var logRoutes = function(server) {

  server.route({
    method: 'GET',
    path: '/logs',
    config: {
      handler: function(request, response) {
        Log.findAll()
          .then(response)
          .catch(function(err) {
            response(Boom.badImplementation(err))
          })
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/logs/{id}',
    config: {
      handler: function(request, response) {
        Log.findById(request.params.id)
          .then(response)
          .catch(function(err) {
            response(Boom.badImplementation(err))
          })
      }
    }
  })

}

module.exports = logRoutes
