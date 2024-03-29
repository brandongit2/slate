import {HttpException, UnauthorizedException, UseGuards} from "@nestjs/common"
import {Args, Context, Mutation, Resolver} from "@nestjs/graphql"
import bcrypt from "bcrypt"

import {FastifyExecutionContext} from "src/FastifyExecutionContext"
import {CurrentUser} from "src/user/user.decorator"
import {User} from "src/user/user.entity"
import {UserService} from "src/user/user.service"
import {AuthGuard} from "./auth.guard"
import {AuthService} from "./auth.service"
import {SignInInput as SignInLocalPayload} from "./dto/signIn.input"
import {SignUpInput} from "./dto/signUp.input"

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Mutation(() => User)
  async signUp(
    @Args() signUpInput: SignUpInput,
    @Context() context: FastifyExecutionContext,
  ): Promise<Omit<User, `password`>> {
    const existingUser = await this.userService.findOneByEmail(signUpInput.email)
    if (existingUser) throw new HttpException(`This email is already taken.`, 409)

    const encryptedPassword = await bcrypt.hash(signUpInput.password, 10)

    const user = await this.userService.create({
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

  @Mutation(() => User)
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

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async signOut(@Context() context: FastifyExecutionContext, @CurrentUser() user: User) {
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
