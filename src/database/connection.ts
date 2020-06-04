import knex from 'knex'
import databaseConfig from '../config/database'

const connection = knex(databaseConfig)

export default connection
