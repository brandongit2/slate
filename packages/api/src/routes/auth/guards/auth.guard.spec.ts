import {createMock} from "@golevelup/ts-jest"
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host"
import {Test} from "@nestjs/testing"
import bcrypt from "bcrypt"
import {KnexCoreModule} from "nestjs-knex/dist/knex.core-module"
import {RedisService} from "@liaoliaots/nestjs-redis"
import {v4} from "uuid"

import {TestDbModule} from "@api/src/testDb.module"

import {UsersModule} from "../../users/users.module"
import {AuthGuard} from "./auth.guard"

describe(`AuthGuard`, () => {
  let guard: AuthGuard
  let redis: RedisService
  let knex: KnexCoreModule

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TestDbModule, UsersModule],
      providers: [AuthGuard],
    }).compile()

    guard = module.get(AuthGuard)
    redis = module.get(RedisService)
    knex = module.get(KnexCoreModule)
  })

  beforeEach(async () =>
    Promise.all([
      redis.getClient().flushall(),
      (async () => {
        console.log(`recreating databases`)
        await knex.raw(`drop database if exists slate`)
        await knex.raw(`create database slate`)
        await knex.migrate.latest()
        console.log(await knex.raw(`select * from users.columns`))
        return
      })(),
    ]),
  )

  test(`it returns true if given a valid authToken`, async () => {
    const SESSION_ID = v4()
    const AUTH_TOKEN = v4()

    const encryptedToken = bcrypt.hashSync(AUTH_TOKEN, 10)
    await redis.getClient().hset(`sess:${SESSION_ID}`, `token`, encryptedToken)

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
