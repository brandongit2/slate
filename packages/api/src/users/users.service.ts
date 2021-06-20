import {Injectable} from "@nestjs/common"
import {InjectRepository} from "@nestjs/typeorm"
import {Repository} from "typeorm"
import {v4} from "uuid"

import {CreateUserInput} from "./dto/createUser.input"
import {UpdateUserInput} from "./dto/updateUser.input"
import {User} from "./entities/user.entity"

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserInput: CreateUserInput) {
    const userId = v4()

    const res = await this.usersRepository.insert({
      id: userId,
      email: createUserInput.email,
      name: createUserInput.name,
    })
    return res.raw.ops[0] as User
  }

  findOne(email: string) {
    return this.usersRepository.findOne({email})
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }
}
