import {KNEX_TOKEN, Knex} from "@brandonnpm2/nestjs-knex"
import {REDIS_TOKEN, Redis} from "@brandonnpm2/nestjs-redis"
import {createMock} from "@golevelup/ts-jest"
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host"
import {Test} from "@nestjs/testing"
import bcrypt from "bcrypt"
import {v4} from "uuid"

import {TestDbModule} from "@api/src/testDb.module"

import users from "../../../../knex/seedData/users.json"
import {UsersModule} from "../../users/users.module"
import {AuthGuard} from "./auth.guard"

describe(`AuthGuard`, () => {
  let guard: AuthGuard
  let redis: Redis
  let knex: Knex

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TestDbModule, UsersModule],
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
