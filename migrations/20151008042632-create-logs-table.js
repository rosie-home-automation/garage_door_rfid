'use strict'

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.creatTable(
      'logs',
      {
        id: {
          DataTypes.UUID,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          DataTypes.INTEGER,
          allowNull: true
        },
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        value: DataTypes.STRING
      },
      {
        createdAt: true,
        updatedAt: false
      })
  },

  down: function (queryInterface, DataTypes) {
    return queryInterface.dropTable('logs')
  }
}
