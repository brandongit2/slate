import {Module} from "@nestjs/common"
import config from "config"
import {RedisModule} from "nestjs-redis"

import {UsersModule} from "@api/src/users/users.module"

import {AuthResolver} from "./auth.resolver"
import {AuthService} from "./auth.service"

@Module({
  imports: [
    RedisModule.register({
      port: config.get(`redis.port`),
      host: `localhost`,
    }),
    UsersModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
