import {injectable} from "inversify"
import {MongoRepository} from "typeorm"
import {v4} from "uuid"

import type {Profile} from "passport-google-oauth20"

import {CreateUserInput} from "./dto/createUser.input"
import {UpdateUserInput} from "./dto/updateUser.input"
import {User} from "./entities/user.entity"
import {UserDb} from "./entities/userDb.entity"

@injectable()
export class UsersService {
  constructor(@InjectRepository(UserDb) private usersRepository: MongoRepository<UserDb>) {}

  async createByLocal(createUserInput: CreateUserInput): Promise<User> {
    const userId = v4()

    const user = this.usersRepository.create({
      userId,
      email: createUserInput.email,
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
      password: createUserInput.password,
    })
    this.usersRepository.save(user)

    return {
      id: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  }

  async createByGoogle(profile: Profile) {}

  async findOneById(userId: string): Promise<User> {
    const dbRes = await this.usersRepository.findOne({userId})
    return {
      id: dbRes!.userId,
      firstName: dbRes!.firstName,
      lastName: dbRes!.lastName,
      email: dbRes!.email,
    }
  }

  // Used only for validating users in the authentication step. For any other use, use `findOneById`.
  async findOneByEmail(email: string): Promise<UserDb> {
    const dbRes = await this.usersRepository.findOne({email})
    return dbRes!
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }
}
