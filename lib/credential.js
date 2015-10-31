var Credential = function(sequelize, DataTypes) {
  return sequelize.define(
    'credential',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
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
