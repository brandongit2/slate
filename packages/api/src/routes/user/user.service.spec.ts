import {Test, TestingModule} from "@nestjs/testing"

import {TestDbModule} from "#/testDb.module"
import {UserService} from "./user.service"

describe(`UsersService`, () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDbModule],
      providers: [UserService],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it(`should be defined`, () => {
    expect(service).toBeDefined()
  })
})
