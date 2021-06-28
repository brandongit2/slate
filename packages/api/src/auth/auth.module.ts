import {Module} from "@nestjs/common"
import config from "config"
import {RedisModule} from "nestjs-redis"

import {AuthController} from "@api/src/auth/auth.controller"
import {AuthResolver} from "@api/src/auth/auth.resolver"
import {AuthService} from "@api/src/auth/auth.service"
import {GoogleStrategy} from "@api/src/auth/passport/google.strategy"
import {UsersModule} from "@api/src/users/users.module"

@Module({
  imports: [
    RedisModule.register({
      port: config.get(`redis.port`),
      host: `localhost`,
    }),
    UsersModule,
  ],
  providers: [AuthResolver, AuthService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
