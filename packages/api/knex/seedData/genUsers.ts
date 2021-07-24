import bcrypt from "bcrypt"
import faker from "faker"
import {v4} from "uuid"

const encryptedPassword = bcrypt.hashSync(`password`, 10)
const users = Array(parseInt(process.argv[2]) || 100)
  .fill(null)
  .map(() => ({
    id: v4(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: encryptedPassword,
  }))

console.log(JSON.stringify(users))
