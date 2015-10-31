var CredentialRoutes = require('./credential_routes')
var LogRoutes = require('./log_routes')
var UserRoutes = require('./user_routes')

var routes = function(server) {
  CredentialRoutes(server)
  LogRoutes(server)
  UserRoutes(server)
}

module.exports = routes
