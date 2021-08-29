import {Test, TestingModule} from "@nestjs/testing"

import {UserModule} from "src/user/user.module"
import {TestDbModule} from "src/testDb.module"
import {AuthService} from "./auth.service"

describe(`AuthService`, () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDbModule, UserModule],
      providers: [AuthService],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it(`should be defined`, () => {
    expect(service).toBeDefined()
  })
})
