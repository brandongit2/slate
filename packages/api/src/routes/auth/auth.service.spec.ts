import {Test, TestingModule} from "@nestjs/testing"
import config from "config"
import {KnexModule} from "nestjs-knex"
import {RedisModule} from "nestjs-redis"

import {TestDbModule} from "@api/src/testDb.module"

import {UsersModule} from "../users/users.module"
import {AuthService} from "./auth.service"

describe(`AuthService`, () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDbModule, UsersModule],
      providers: [AuthService],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it(`should be defined`, () => {
    expect(service).toBeDefined()
  })
})
