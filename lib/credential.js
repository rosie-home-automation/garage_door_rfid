var Credential = function(sequelize, DataTypes) {
  return sequelize.define(
    'credential',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true
      },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      value: DataTypes.STRING
    },
    {
      timestamps: true
    }
  )
}

module.exports = Credential
