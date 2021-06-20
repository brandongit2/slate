import {Injectable} from "@nestjs/common"

import {CreateUserInput} from "./dto/create-user.input"
import {UpdateUserInput} from "./dto/update-user.input"

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return `This action adds a new user`
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: string) {
    return {
      id: `1`,
      name: `Brandon Tsang`,
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
