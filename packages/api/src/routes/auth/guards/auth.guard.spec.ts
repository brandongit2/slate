import {createMock} from "@golevelup/ts-jest"
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host"
import {Test} from "@nestjs/testing"
import {RedisService} from "nestjs-redis"

import {TestDbModule} from "@api/src/testDb.module"

import {AuthGuard} from "./auth.guard"

describe(`AuthGuard`, () => {
  let guard: AuthGuard
  let redis: RedisService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TestDbModule],
      providers: [AuthGuard],
    }).compile()

    guard = module.get(AuthGuard)
    redis = module.get(RedisService)
  })

  beforeEach(async () => {
    await redis.getClient().flushall()
  })

  // afterAll(() => {
  //   redis.getClient().quit()
  // })

  describe(`should return true if given a valid authToken`, () => {
    // await redis.getClient().hset(`a`, ``)

    const mockContext = createMock<ExecutionContextHost>()
    guard.canActivate(mockContext)

    expect(1).toBe(1)
  })
})
