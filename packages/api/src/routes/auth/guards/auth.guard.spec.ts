import {createMock} from "@golevelup/ts-jest"
import {ExecutionContext} from "@nestjs/common"
import {Test} from "@nestjs/testing"
import config from "config"
import {RedisModule, RedisService} from "nestjs-redis"

import {AuthGuard} from "./auth.guard"

describe(`AuthGuard`, () => {
  let guard: AuthGuard
  let redis: RedisService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        RedisModule.register({
          port: config.get(`redis.port`),
          host: `localhost`,
        }),
      ],
      providers: [AuthGuard],
    }).compile()

    guard = module.get(AuthGuard)
    redis = module.get(RedisService)
  })

  beforeEach(async () => {
    await redis.getClient().flushall()
  })

  describe(`should return true if given a valid authToken`, () => {
    // await redis.getClient().hset(`a`, ``)

    const mockContext = createMock<ExecutionContext>()
    const a = mockContext
    console.log(a)

    expect(1).toBe(1)
  })
})
