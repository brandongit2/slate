import {HttpException, ValidationPipe} from "@nestjs/common"
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql"

import {CreateUserInput} from "./dto/createUser.input"
import {UpdateUserInput} from "./dto/updateUser.input"
import {User} from "./entities/user.entity"
import {UsersService} from "./users.service"

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, {nullable: true})
  async createUser(@Args(`createUserInput`, ValidationPipe) createUserInput: CreateUserInput) {
    const existingUser = await this.usersService.findOne(createUserInput.email)
    if (existingUser) throw new HttpException(`This user already exists.`, 409)

    return await this.usersService.create(createUserInput)
  }

  @Query(() => User, {name: `user`})
  findOne(@Args(`email`) email: string) {
    return this.usersService.findOne(email)
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
