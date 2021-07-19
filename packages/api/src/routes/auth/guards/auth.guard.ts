import {RedisService} from "@liaoliaots/nestjs-redis"
import {CanActivate, Injectable} from "@nestjs/common"
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host"
import bcrypt from "bcrypt"

import {FastifyExecutionContext} from "@api/src/FastifyExecutionContext"
import {UsersService} from "@api/src/routes/users/users.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private redisService: RedisService, private usersService: UsersService) {}

  async canActivate(context: ExecutionContextHost) {
    // Get the request args
    const args = context.getArgs()[2] as FastifyExecutionContext

    // Get `authToken` from cookies
    const cookies = args.request.cookies
    if (!cookies.sessionId || !cookies.authToken) return false

    // Get `token` from Redis
    const redis = this.redisService.getClient()
    const token = await redis.hget(`sess:${cookies.sessionId}`, `token`)

    // Compare the tokens
    const isValidToken = bcrypt.compareSync(cookies.authToken, token!)

    if (isValidToken) {
      // Get user and place it in context
      const userId = await redis.hget(`sess:${cookies.sessionId}`, `userId`)
      const user = await this.usersService.findOneById(userId!)
      args.request.user = user!
    }

    return isValidToken
  }
}
