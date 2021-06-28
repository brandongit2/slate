import {Injectable} from "@nestjs/common"
import config from "config"
import fastifyPassport from "fastify-passport"
import {Strategy} from "passport-google-oauth20"

import type {Profile, VerifyCallback} from "passport-google-oauth20"

@Injectable()
export class GoogleStrategy {
  constructor() {
    fastifyPassport.use(
      `google`,
      new Strategy(
        {
          clientID: config.get(`oauth.google.clientId`),
          clientSecret: config.get(`oauth.google.clientSecret`),
          callbackURL: `${config.get(`app.url`)}/auth/google/redirect`,
        },
        (accessToken, refreshToken, profile, cb) => {},
      ),
    )
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) {
    // const user = await this.usersService.createByGoogle(profile)
    // if (!user) throw new UnauthorizedException()
    console.log(profile)

    return cb()
  }
}
