import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common"
import {GqlExecutionContext} from "@nestjs/graphql"
import bcrypt from "bcrypt"
import {RedisService} from "nestjs-redis"

import {FastifyExecutionContext} from "@api/src/FastifyExecutionContext"
import {UsersService} from "@api/src/routes/users/users.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private redisService: RedisService, private usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext() as FastifyExecutionContext
    const cookies = ctx.request.cookies

    if (!cookies.sessionId || !cookies.authToken) return false

    const redis = this.redisService.getClient()
    const token = await redis.hget(`sess:${cookies.sessionId}`, `token`)
    const isValidToken = bcrypt.compareSync(cookies.authToken, token!)

    if (isValidToken) {
      const userId = await redis.hget(`sess:${cookies.sessionId}`, `userId`)
      const user = await this.usersService.findOneById(userId!)
      ctx.request.user = user!
    }

    return isValidToken
  }
}
