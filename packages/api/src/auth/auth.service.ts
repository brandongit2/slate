import bcrypt from "bcrypt"
import {injectable} from "inversify"
import {v4} from "uuid"

import {User} from "@api/src/users/entities/user.entity"
import {UsersService} from "@api/src/users/users.service"

@injectable()
export class AuthService {
  constructor(private usersService: UsersService, private redisService: RedisService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email)

    if (user && bcrypt.compareSync(password, user.password!)) {
      return {
        id: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    } else {
      return null
    }
  }

  async validateUserGoogle() {}

  async genSessionToken(userId: string, sessionId?: string) {
    const token = v4()
    const encryptedToken = bcrypt.hashSync(token, 10)

    if (!sessionId) sessionId = v4()

    const redis = this.redisService.getClient()
    await Promise.all([
      redis.hset(`sess:${sessionId}`, `userId`, userId),
      redis.hset(`sess:${sessionId}`, `token`, encryptedToken),
    ])

    return {sessionId, token}
  }

  async removeToken(sessionId: string) {
    const redis = this.redisService.getClient()
    await redis.del(`sess:${sessionId}`)
  }
}
