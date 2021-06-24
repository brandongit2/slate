import {Injectable} from "@nestjs/common"
import {JwtService} from "@nestjs/jwt"
import {InjectRepository} from "@nestjs/typeorm"
import bcrypt from "bcrypt"
import {MongoRepository} from "typeorm"

import {UsersService} from "@api/src/users/users.service"

import {User} from "../users/entities/user.entity"
import {JwtDb} from "./entities/jwt.entity"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(JwtDb) private jwtsRepository: MongoRepository<JwtDb>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email)

    if (user && bcrypt.compareSync(password, user.password)) {
      return user
    } else {
      return null
    }
  }

  signJwt(user: User) {
    const {id, ...payload} = {...user, sub: user.id}
    return this.jwtService.sign(payload)
  }

  async blacklistJwt(jwt: string) {
    await this.jwtsRepository.insert({
      jwt,
      blacklistedDate: new Date(),
    })
  }
}
