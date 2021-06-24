import {Injectable} from "@nestjs/common"
import {InjectRepository} from "@nestjs/typeorm"
import {MongoRepository} from "typeorm"
import {v4} from "uuid"

import {CreateUserInput} from "./dto/createUser.input"
import {UpdateUserInput} from "./dto/updateUser.input"
import {UserDb} from "./entities/userDb.entity"

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserDb) private usersRepository: MongoRepository<UserDb>) {}

  async create(createUserInput: CreateUserInput) {
    const userId = v4()

    const user = this.usersRepository.create({
      id: userId,
      email: createUserInput.email,
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
      password: createUserInput.password,
    })
    this.usersRepository.save(user)

    return user
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({email})
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }
}
