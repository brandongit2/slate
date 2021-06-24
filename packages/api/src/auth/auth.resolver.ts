import {HttpException, UseGuards} from "@nestjs/common"
import {Args, Context, Mutation, Resolver} from "@nestjs/graphql"
import bcrypt from "bcrypt"

import type {FastifyReply, FastifyRequest} from "fastify"

import {User} from "@api/src/users/entities/user.entity"
import {UsersService} from "@api/src/users/users.service"

import {CurrentUser} from "../users/decorators/user.decorator"
import {AuthService} from "./auth.service"
import {SignInInput} from "./dto/signIn.input"
import {SignUpInput} from "./dto/signUp.input"
import {JwtAuthGuard} from "./guards/jwtAuth.guard"

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Mutation(() => User)
  async signUp(@Args() signUpInput: SignUpInput, @Context() context: {request: FastifyRequest; reply: FastifyReply}) {
    const existingUser = await this.usersService.findOne(signUpInput.email)
    if (existingUser) throw new HttpException(`This email is already taken.`, 409)

    const encryptedPassword = await bcrypt.hash(signUpInput.password, 10)

    const {password, ...user} = await this.usersService.create({
      firstName: signUpInput.firstName,
      lastName: signUpInput.lastName,
      email: signUpInput.email,
      password: encryptedPassword,
    })

    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)

    context.reply.setCookie(`authToken`, this.authService.signJwt(user), {
      expires: expiryDate,
      maxAge: 2592000,
      httpOnly: true,
      sameSite: `lax`,
      secure: true,
      path: `/`,
    })

    return user
  }

  @Mutation(() => User)
  async signIn(@Args() signInInput: SignInInput, @Context() context: {request: FastifyRequest; reply: FastifyReply}) {
    const dbRes = await this.authService.validateUser(signInInput.email, signInInput.password)
    if (!dbRes) throw new HttpException(`Incorrect email or password.`, 401)

    const {password, ...user} = dbRes

    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)

    context.reply.setCookie(`authToken`, this.authService.signJwt(user), {
      expires: expiryDate,
      maxAge: 2592000,
      httpOnly: true,
      sameSite: `lax`,
      secure: true,
      path: `/`,
    })

    return user
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async signOut(@Context() context: {request: FastifyRequest; reply: FastifyReply}, @CurrentUser() user: User) {
    await this.authService.blacklistJwt(context.request.cookies.authToken)

    context.reply.setCookie(`authToken`, ``, {
      expires: new Date(0),
      httpOnly: true,
      sameSite: `lax`,
      secure: true,
      path: `/`,
    })

    return user
  }
}
