var Boom = require('boom')
var User = require('./datastore').User

var logRoutes = function(server) {

  server.route({
    method: 'GET',
    path: '/users',
    config: {
      handler: function(request, response) {
        User.findAll()
          .then(response)
          .catch(function(err) {
            response(Boom.badImplementation(err))
          })
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/users/{id}',
    config: {
      handler: function(request, response) {
        User.findById(request.params.id)
          .then(response)
          .catch(function(err) {
            response(Boom.badImplementation(err))
          })
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/users',
    config: {
      handler: function(request, response) {
        User.create(request.payload)
          .then(response)
          .catch(function(err) {
            response(Boom.badImplementation(err))
          })
      }
    }
  })

  server.route({
    method: 'PUT',
    path: '/users/{id}',
    config: {
      handler: function(request, response) {
        User.findById(request.params.id)
          .then(function(credential) {
            credential.update(request.payload)
              .then(response)
          })
          .catch(function(err) {
            response(Boom.badImplementation(err))
          })
      }
    }
  })

  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    config: {
      handler: function(request, response) {
        User.findById(request.params.id)
          .then(function(credential) {
            credential.destroy()
              .then(response)
          })
          .catch(function(err) {
            response(Boom.badImplementation(err))
          })
      }
    }
  })

}

module.exports = logRoutes
