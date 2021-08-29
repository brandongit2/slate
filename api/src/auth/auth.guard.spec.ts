import {KNEX_TOKEN} from "@brandonnpm2/nestjs-knex"
import {REDIS_TOKEN} from "@brandonnpm2/nestjs-redis"
import {createMock} from "@golevelup/ts-jest"
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host"
import {Test} from "@nestjs/testing"
import bcrypt from "bcrypt"
import {Redis} from "ioredis"
import Knex from "knex"
import {v4} from "uuid"

import {UserModule} from "src/user/user.module"
import {TestDbModule} from "src/testDb.module"
import users from "#seedData/users.json"
import {AuthGuard} from "./auth.guard"

describe(`AuthGuard`, () => {
  let guard: AuthGuard
  let redis: Redis
  let knex: Knex

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TestDbModule, UserModule],
      providers: [AuthGuard],
    }).compile()

    guard = module.get(AuthGuard)
    redis = module.get(REDIS_TOKEN)
    knex = module.get(KNEX_TOKEN)
  })

  beforeEach(async () =>
    Promise.all([
      redis.flushall(),
      (async () => {
        await knex.raw(`start transaction`)
      })(),
    ]),
  )

  afterEach(async () => {
    await knex.raw(`rollback`)
  })

  test(`it returns true if given a valid authToken`, async () => {
    const SESSION_ID = v4()
    const AUTH_TOKEN = v4()

    const encryptedToken = bcrypt.hashSync(AUTH_TOKEN, 10)
    await redis.hset(`sess:${SESSION_ID}`, `token`, encryptedToken)
    await redis.hset(`sess:${SESSION_ID}`, `userId`, users[0].id)

    const mockContext = createMock<ExecutionContextHost>({
      getArgs: () =>
        [
          undefined,
          undefined,
          {
            request: {
              cookies: {
                authToken: AUTH_TOKEN,
                sessionId: SESSION_ID,
              },
            },
          },
        ] as any[],
    })
    const res = await guard.canActivate(mockContext)

    expect(res).toBeTruthy()
  })
})
