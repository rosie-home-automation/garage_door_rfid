'use strict'

let config = require('config').database
let Sequelize = require('sequelize')

let sequelize = new Sequelize(config.name, config.username, config.password, config.options)

// add models
module.exports.Credential = sequelize.import('./credential')
module.exports.Log = sequelize.import('./log')
module.exports.User = sequelize.import('./user')
