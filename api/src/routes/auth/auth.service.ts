import {InjectRedis} from "@brandonnpm2/nestjs-redis"
import {Injectable, UnauthorizedException} from "@nestjs/common"
import bcrypt from "bcrypt"
import {Redis} from "ioredis"
import {v4} from "uuid"

import {User} from "#/routes/user/user.entity"
import {UserService} from "#/routes/user/user.service"

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, @InjectRedis() private readonly redis: Redis) {}

  async validateUserLocal(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email)

    if (user && bcrypt.compareSync(password, user.password)) {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    } else {
      throw new UnauthorizedException()
    }
  }

  async genSessionToken(userId: string, sessionId?: string) {
    const token = v4()
    const encryptedToken = bcrypt.hashSync(token, 10)

    if (!sessionId) sessionId = v4()

    await Promise.all([
      this.redis.hset(`sess:${sessionId}`, `userId`, userId),
      this.redis.hset(`sess:${sessionId}`, `token`, encryptedToken),
    ])

    return {sessionId, token}
  }

  async removeToken(sessionId: string) {
    await this.redis.del(`sess:${sessionId}`)
  }
}
