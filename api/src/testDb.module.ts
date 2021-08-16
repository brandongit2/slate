import {KnexModule} from "@brandonnpm2/nestjs-knex"
import {RedisModule} from "@brandonnpm2/nestjs-redis"
import {Module} from "@nestjs/common"
import config from "config"

const KnexImport = KnexModule.register({
  client: `pg`,
  connection: {
    user: `postgres`,
    password: `password`,
    database: `slate`,
    port: config.get(`db.port`),
  },
})

const RedisImport = RedisModule.register({
  port: config.get(`redis.port`),
  host: `localhost`,
})

@Module({
  imports: [KnexImport, RedisImport],
})
export class TestDbModule {}
