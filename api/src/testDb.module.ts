import {KnexModule} from "@brandonnpm2/nestjs-knex"
import {RedisModule} from "@brandonnpm2/nestjs-redis"
import {Module} from "@nestjs/common"
import dotenv from "dotenv"
import path from "path"

dotenv.config({
  path: path.resolve(process.cwd(), `..`, `.env`),
})

const KnexImport = KnexModule.register({
  client: `pg`,
  connection: {
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT!),
  },
})

const RedisImport = RedisModule.register({
  host: process.env.REDIS_HOSTNAME,
  port: parseInt(process.env.REDIS_PORT!),
})

@Module({
  imports: [KnexImport, RedisImport],
})
export class TestDbModule {}
