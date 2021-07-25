import {InjectRedis, Redis} from "@brandonnpm2/nestjs-redis"
import {CanActivate, Injectable} from "@nestjs/common"
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host"
import bcrypt from "bcrypt"

import {FastifyExecutionContext} from "$/FastifyExecutionContext"
import {UsersService} from "$routes/users/users.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectRedis() private readonly redis: Redis, private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContextHost) {
    // Get the request args
    const args = context.getArgs()[2] as FastifyExecutionContext

    // Get `authToken` from cookies
    const cookies = args.request.cookies
    if (!cookies.sessionId || !cookies.authToken) return false

    // Get `token` from Redis
    const token = await this.redis.hget(`sess:${cookies.sessionId}`, `token`)

    // Compare the tokens
    const isValidToken = bcrypt.compareSync(cookies.authToken, token!)

    if (isValidToken) {
      // Get user and place it in context
      const userId = await this.redis.hget(`sess:${cookies.sessionId}`, `userId`)
      const user = await this.usersService.findOneById(userId!)
      args.request.user = user!
    }

    return isValidToken
  }
}
