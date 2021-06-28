import {Injectable, UnauthorizedException} from "@nestjs/common"
import fastifyPassport from "fastify-passport"
import {Strategy} from "passport-local"

import {AuthService} from "@api/src/auth/auth.service"

@Injectable()
export class LocalStrategy {
  constructor(private authService: AuthService) {
    fastifyPassport.use(
      `local`,
      new Strategy(async (email, password, done) => {
        try {
          const user = await this.authService.validateUser(email, password)
          if (!user) throw new UnauthorizedException()

          return done(null, user)
        } catch (err) {
          return done(err, null)
        }
      }),
    )
  }
}
