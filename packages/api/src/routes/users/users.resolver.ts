import {UseGuards, ValidationPipe} from "@nestjs/common"
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql"

import {AuthGuard} from "$routes/auth/guards/auth.guard"
import {CurrentUser} from "./decorators/user.decorator"
import {UpdateUserInput} from "./dto/updateUser.input"
import {UserEntity} from "./entities/user.entity"
import {UsersService} from "./users.service"

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserEntity)
  @UseGuards(AuthGuard)
  user(@CurrentUser() user: UserEntity) {
    return user
  }

  @Mutation(() => UserEntity)
  updateUser(@Args(`updateUserInput`, ValidationPipe) updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => UserEntity)
  removeUser(@Args(`id`) id: string) {
    return this.usersService.remove(id)
  }
}
