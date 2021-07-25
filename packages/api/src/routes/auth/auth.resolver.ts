import {HttpException, UnauthorizedException, UseGuards} from "@nestjs/common"
import {Args, Context, Mutation, Resolver} from "@nestjs/graphql"
import bcrypt from "bcrypt"

import {FastifyExecutionContext} from "$/FastifyExecutionContext"
import {CurrentUser} from "$routes/users/decorators/user.decorator"
import {UserEntity} from "$routes/users/entities/user.entity"
import {UsersService} from "$routes/users/users.service"
import {AuthService} from "./auth.service"
import {SignInInput as SignInLocalPayload} from "./dto/signIn.input"
import {SignUpInput} from "./dto/signUp.input"
import {AuthGuard} from "./guards/auth.guard"

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity)
  async signUp(
    @Args() signUpInput: SignUpInput,
    @Context() context: FastifyExecutionContext,
  ): Promise<Omit<UserEntity, `password`>> {
    const existingUser = await this.usersService.findOneByEmail(signUpInput.email)
    if (existingUser) throw new HttpException(`This email is already taken.`, 409)

    const encryptedPassword = await bcrypt.hash(signUpInput.password, 10)

    const user = await this.usersService.create({
      firstName: signUpInput.firstName,
      lastName: signUpInput.lastName,
      email: signUpInput.email,
      password: encryptedPassword,
    })

    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)

    const token = await this.authService.genSessionToken(user.id, context.request.cookies.sessionId)

    context.reply.setCookie(`authToken`, token.token, {
      expires: expiryDate,
      maxAge: 2592000,
      httpOnly: true,
      sameSite: `lax`,
      secure: true,
      path: `/`,
    })

    if (!context.request.cookies.sessionId)
      context.reply.setCookie(`sessionId`, token.sessionId, {
        expires: expiryDate,
        maxAge: 2592000,
        httpOnly: true,
        sameSite: `lax`,
        secure: true,
        path: `/`,
      })

    return user
  }

  @Mutation(() => UserEntity)
  async signInLocal(@Args() {email, password}: SignInLocalPayload, @Context() context: FastifyExecutionContext) {
    const user = await this.authService.validateUserLocal(email, password)
    if (!user) throw new UnauthorizedException()

    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)

    const token = await this.authService.genSessionToken(user.id, context.request.cookies.sessionId)

    context.reply.setCookie(`authToken`, token.token, {
      expires: expiryDate,
      maxAge: 2592000,
      httpOnly: true,
      sameSite: `lax`,
      secure: true,
      path: `/`,
    })

    if (!context.request.cookies.sessionId)
      context.reply.setCookie(`sessionId`, token.sessionId, {
        expires: expiryDate,
        maxAge: 2592000,
        httpOnly: true,
        sameSite: `lax`,
        secure: true,
        path: `/`,
      })

    return user
  }

  @Mutation(() => UserEntity)
  @UseGuards(AuthGuard)
  async signOut(@Context() context: FastifyExecutionContext, @CurrentUser() user: UserEntity) {
    this.authService.removeToken(context.request.cookies.sessionId)

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
