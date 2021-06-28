import {UserInputError} from "apollo-server-core"
import bcrypt from "bcrypt"
import {Args, Ctx, Mutation, Resolver} from "type-graphql"

import {AuthService} from "@api/src/auth/auth.service"
import {SignInInput} from "@api/src/auth/dto/signIn.input"
import {SignUpInput} from "@api/src/auth/dto/signUp.input"
import {FastifyExecutionContext} from "@api/src/FastifyContext"
import {CurrentUser} from "@api/src/users/decorators/user.decorator"
import {User} from "@api/src/users/entities/user.entity"
import {UsersService} from "@api/src/users/users.service"

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Mutation(() => User)
  async signUp(@Args() {firstName, lastName, email, password}: SignUpInput, @Ctx() context: any): Promise<User> {
    const existingUser = await this.usersService.findOneByEmail(email)
    if (existingUser) throw new UserInputError(`This email is already taken.`)

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await this.usersService.createByLocal({
      firstName,
      lastName,
      email,
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
  async signIn(@Args() signInInput: SignInInput, @Ctx() context: FastifyExecutionContext) {
    const user = await this.authService.validateUser(signInInput.email, signInInput.password)
    if (!user) throw new UserInputError(`Incorrect email or password.`)

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
  async signOut(@Ctx() context: FastifyExecutionContext, @CurrentUser() user: User) {
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
