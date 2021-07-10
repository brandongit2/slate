import {Module} from "@nestjs/common"
import config from "config"
import {KnexModule} from "nestjs-knex"
import {RedisModule} from "nestjs-redis"

const KnexImport = KnexModule.forRoot({
  config: {
    client: `pg`,
    connection: {
      user: `postgres`,
      password: `password`,
      database: `slate`,
      port: config.get(`db.port`),
    },
  },
})

const RedisImport = RedisModule.register({
  port: config.get(`redis.port`),
  host: `localhost`,
})

@Module({
  imports: [KnexImport, RedisImport],
  exports: [KnexImport, RedisImport],
})
export class TestDbModule {}
