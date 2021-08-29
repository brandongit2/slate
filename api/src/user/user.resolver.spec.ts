import {Test, TestingModule} from "@nestjs/testing"

import {TestDbModule} from "src/testDb.module"
import {AuthModule} from "#routes/auth/auth.module"
import {UserResolver} from "./user.resolver"
import {UserService} from "./user.service"

describe(`UsersResolver`, () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDbModule, AuthModule],
      providers: [UserResolver, UserService],
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
  })

  it(`should be defined`, () => {
    expect(resolver).toBeDefined()
  })
})
