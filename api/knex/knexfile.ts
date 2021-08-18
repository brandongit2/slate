import dotenv from "dotenv"
import Knex from "knex"
import path from "path"

dotenv.config({
  path: path.resolve(process.cwd(), `..`, `.env`),
})

const knexConfig: Knex.Config = {
  client: `pg`,
  connection: {
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT!),
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
