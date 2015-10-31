var Log = function(sequelize, DataTypes) {
  return sequelize.define(
    'log',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
      },
      type: DataTypes.STRING,
      message: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      data: {
        type: DataTypes.JSON,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      createdAt: 'createdAt',
      updatedAt: false
    }
  )
}

module.exports = Log
