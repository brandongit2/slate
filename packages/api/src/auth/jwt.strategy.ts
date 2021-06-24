import {Injectable} from "@nestjs/common"
import {PassportStrategy} from "@nestjs/passport"
import config from "config"
import {FastifyRequest} from "fastify"
import {Strategy} from "passport-jwt"

import {User} from "../users/entities/user.entity"
import {UserPayload} from "./entities/userPayload.entity"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: FastifyRequest) => req.cookies.authToken || null,
      ignoreExpiration: false,
      secretOrKey: config.get(`api.secret`),
    })
  }

  validate(payload: UserPayload): User {
    const {sub, ...user} = {...payload, id: payload.sub}
    return user
  }
}
