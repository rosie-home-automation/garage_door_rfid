var User = function(datastore, DataTypes) {
  return datastore.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING
    },
    {
      timestamps: true
    }
  )
}

module.exports = User
