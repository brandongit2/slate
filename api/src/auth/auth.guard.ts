import {InjectRedis} from "@brandonnpm2/nestjs-redis"
import {CanActivate, Injectable} from "@nestjs/common"
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host"
import bcrypt from "bcrypt"
import {Redis} from "ioredis"

import {FastifyExecutionContext} from "src/FastifyExecutionContext"
import {UserService} from "src/user/user.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectRedis() private readonly redis: Redis, private readonly userService: UserService) {}

  async canActivate(context: ExecutionContextHost) {
    // Get the request args
    const args = context.getArgs()[2] as FastifyExecutionContext

    // Get `authToken` from cookies
    const cookies = args.request.cookies
    if (!cookies.sessionId || !cookies.authToken) return false

    // Get `token` from Redis
    const token = await this.redis.hget(`sess:${cookies.sessionId}`, `token`)
    if (!token) {
      await this.redis.hdel(`sess:${cookies.sessionId}`, `token`)
      return false
    }

    // Compare the tokens
    const isValidToken = bcrypt.compareSync(cookies.authToken, token)

    if (isValidToken) {
      // Get user and place it in context
      const userId = await this.redis.hget(`sess:${cookies.sessionId}`, `userId`)
      const user = await this.userService.findOneById(userId!)
      args.request.user = user!
    }

    return isValidToken
  }
}
