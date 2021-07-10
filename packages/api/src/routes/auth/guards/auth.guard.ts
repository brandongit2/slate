import {CanActivate, Injectable} from "@nestjs/common"
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host"
import {GqlExecutionContext} from "@nestjs/graphql"
import bcrypt from "bcrypt"
import {RedisService} from "nestjs-redis"

import {FastifyExecutionContext} from "@api/src/FastifyExecutionContext"
import {UsersService} from "@api/src/routes/users/users.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private redisService: RedisService, private usersService: UsersService) {}

  async canActivate(context: ExecutionContextHost) {
    // Get the execution context
    const ctx = GqlExecutionContext.create(context).getContext() as FastifyExecutionContext
    console.log(context.getArgs())

    // Get `authToken` from cookies
    const cookies = ctx.request.cookies
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
      ctx.request.user = user!
    }

    return isValidToken
  }
}
