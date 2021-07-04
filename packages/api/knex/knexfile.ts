import config from "config"
import * as Knex from "knex"
import path from "path"

const knexConfig: Knex.Knex.Config = {
  client: `pg`,
  connection: {
    user: `postgres`,
    password: `password`,
    database: `slate`,
    port: config.get(`db.port`),
  },
  migrations: {
    extension: `ts`,
    directory: path.join(__dirname, `./migrations`),
  },
  seeds: {
    extension: `ts`,
    directory: path.join(__dirname, `./seeds`),
  },
}

export default knexConfig
