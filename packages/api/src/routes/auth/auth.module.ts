import {RedisModule} from "@liaoliaots/nestjs-redis"
import {Module} from "@nestjs/common"
import config from "config"

import {UsersModule} from "@api/src/routes/users/users.module"

import {AuthResolver} from "./auth.resolver"
import {AuthService} from "./auth.service"

@Module({
  imports: [
    RedisModule.forRoot({
      defaultOptions: {
        port: config.get(`redis.port`),
        host: `localhost`,
      },
    }),
    UsersModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
