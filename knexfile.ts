import databaseConfig from './src/config/database'
import path from 'path'

module.exports = {
  ...databaseConfig,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
}
