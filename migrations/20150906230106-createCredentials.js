var dbm = global.dbm || require('db-migrate')
var type = dbm.dataType

exports.up = function(db, callback) {
  db.createTable('credentials', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    userId: { type: 'int' },
    name: 'string',
    type: 'string',
    value: 'string',
    createdAt: { type: 'datetime' },
    updatedAt: { type: 'datetime' }
  }, callback)
}

exports.down = function(db, callback) {
  db.dropTable('credentials', callback)
}
