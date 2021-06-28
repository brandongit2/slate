import bcrypt from "bcrypt"

import {FastifyExecutionContext} from "@api/src/FastifyContext"
import {UsersService} from "@api/src/users/users.service"

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private redisService: RedisService, private usersService: UsersService) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }

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
