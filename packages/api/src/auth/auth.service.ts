import {Injectable} from "@nestjs/common"
import {JwtService} from "@nestjs/jwt"
import bcrypt from "bcrypt"

import {UsersService} from "@api/src/users/users.service"

import {UserDb} from "../users/entities/userDb.entity"

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email)

    if (user && bcrypt.compareSync(password, user.password)) {
      return user
    } else {
      return null
    }
  }

  signJwt(user: UserDb) {
    const {id, password, ...payload} = {...user, sub: user.id}
    return this.jwtService.sign(payload)
  }
}