import {RedisModule} from "@liaoliaots/nestjs-redis"
import {Module} from "@nestjs/common"
import config from "config"
import {KnexModule} from "nestjs-knex"

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

const RedisImport = RedisModule.forRoot({
  defaultOptions: {
    port: config.get(`redis.port`),
    host: `localhost`,
  },
})

@Module({
  imports: [KnexImport, RedisImport],
})
export class TestDbModule {}
