import {Module} from "@nestjs/common"
import {PassportModule} from "@nestjs/passport"
import config from "config"
import {RedisModule} from "nestjs-redis"

import {UsersModule} from "@api/src/users/users.module"

import {AuthResolver} from "./auth.resolver"
import {AuthService} from "./auth.service"
import {LocalStrategy} from "./local.strategy"

@Module({
  imports: [
    RedisModule.register({
      port: config.get(`redis.port`),
      host: `localhost`,
    }),
    UsersModule,
    PassportModule,
  ],
  providers: [AuthResolver, AuthService, LocalStrategy],
})
export class AuthModule {}
