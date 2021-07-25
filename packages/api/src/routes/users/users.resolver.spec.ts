import {Test, TestingModule} from "@nestjs/testing"

import {TestDbModule} from "$/testDb.module"
import {AuthModule} from "$routes/auth/auth.module"
import {UsersResolver} from "./users.resolver"
import {UsersService} from "./users.service"

describe(`UsersResolver`, () => {
  let resolver: UsersResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDbModule, AuthModule],
      providers: [UsersResolver, UsersService],
    }).compile()

    resolver = module.get<UsersResolver>(UsersResolver)
  })

  it(`should be defined`, () => {
    expect(resolver).toBeDefined()
  })
})
