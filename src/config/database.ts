import path from 'path'

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '..', 'database', 'database.sqlite'),
  },
  useNullAsDefault: true,
}
