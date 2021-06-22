import {UseGuards, ValidationPipe} from "@nestjs/common"
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql"

import {JwtAuthGuard} from "../auth/guards/jwtAuth.guard"
import {CurrentUser} from "./decorators/user.decorator"
import {UpdateUserInput} from "./dto/updateUser.input"
import {User} from "./entities/user.entity"
import {UsersService} from "./users.service"

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  user(@CurrentUser() user: User) {
    return user
  }

  @Mutation(() => User)
  updateUser(@Args(`updateUserInput`, ValidationPipe) updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => User)
  removeUser(@Args(`id`) id: string) {
    return this.usersService.remove(id)
  }
}
