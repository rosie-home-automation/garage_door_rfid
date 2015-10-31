var Boom = require('boom')
var Credential = require('./datastore').Credential

var routes = function(server) {

  server.route({
    method: 'GET',
    path: '/credentials',
    config: {
      handler: function(request, response) {
        Credential.findAll()
          .then(response)
          .catch(function(err) {
            response(Boom.badImplementation(err))
          })
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/credentials/{id}',
    config: {
      handler: function(request, response) {
        Credential.findById(request.params.id)
          .then(response)
          .catch(function(err) {
            response(Boom.badImplementation(err))
          })
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/credentials',
    config: {
      handler: function(request, response) {
        Credential.create(request.payload)
          .then(response)
          .catch(function(err) {
            response(Boom.badImplementation(err))
          })
      }
    }
  })

  server.route({
    method: 'PUT',
    path: '/credentials/{id}',
    config: {
      handler: function(request, response) {
        Credential.findById(request.params.id)
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
    path: '/credentials/{id}',
    config: {
      handler: function(request, response) {
        Credential.findById(request.params.id)
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

module.exports = routes
