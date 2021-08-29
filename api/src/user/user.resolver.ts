import {UseGuards, ValidationPipe} from "@nestjs/common"
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql"

import {AuthGuard} from "#routes/auth/auth.guard"
import {UpdateUserInput} from "./dto/updateUser.input"
import {CurrentUser} from "./user.decorator"
import {User} from "./user.entity"
import {UserService} from "./user.service"

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  user(@CurrentUser() user: User) {
    return user
  }

  @Mutation(() => User)
  updateUser(@Args(`updateUserInput`, ValidationPipe) updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => User)
  removeUser(@Args(`id`) id: string) {
    return this.userService.remove(id)
  }
}
