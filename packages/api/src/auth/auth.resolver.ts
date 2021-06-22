import {HttpException, ValidationPipe} from "@nestjs/common"
import {Args, Mutation, Resolver} from "@nestjs/graphql"
import bcrypt from "bcrypt"

import {User} from "@api/src/users/entities/user.entity"
import {UsersService} from "@api/src/users/users.service"

import {AuthService} from "./auth.service"
import {SignInInput} from "./dto/signIn.input"
import {SignUpInput} from "./dto/signUp.input"
import {AuthToken} from "./entities/authToken.entity"

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Mutation(() => AuthToken)
  async signUp(@Args(`signUpInput`, ValidationPipe) signUpInput: SignUpInput) {
    const existingUser = await this.usersService.findOne(signUpInput.email)
    if (existingUser) throw new HttpException(`This user already exists.`, 409)

    const encryptedPassword = await bcrypt.hash(signUpInput.password, 10)

    const user = await this.usersService.create({
      name: signUpInput.name,
      email: signUpInput.email,
      password: encryptedPassword,
    })

    return {authToken: this.authService.signJwt(user)}
  }

  @Mutation(() => User)
  async signIn(@Args(`signInInput`, ValidationPipe) signInInput: SignInInput) {
    const user = await this.authService.validateUser(signInInput.email, signInInput.password)
    if (!user) throw new HttpException(`Incorrect email or password.`, 401)

    return this.authService.signJwt(user)
  }
}
