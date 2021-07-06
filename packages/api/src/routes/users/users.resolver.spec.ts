import {Test, TestingModule} from "@nestjs/testing"
import config from "config"
import {KnexModule} from "nestjs-knex"

import {AuthModule} from "../auth/auth.module"
import {UsersResolver} from "./users.resolver"
import {UsersService} from "./users.service"

describe(`UsersResolver`, () => {
  let resolver: UsersResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRoot({
          config: {
            client: `pg`,
            connection: {
              user: `postgres`,
              password: `password`,
              database: `slate`,
              port: config.get(`db.port`),
            },
          },
        }),
        AuthModule,
      ],
      providers: [UsersResolver, UsersService],
    }).compile()

    resolver = module.get<UsersResolver>(UsersResolver)
  })

  it(`should be defined`, () => {
    expect(resolver).toBeDefined()
  })
})
