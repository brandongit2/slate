import {Test, TestingModule} from "@nestjs/testing"
import config from "config"
import {KnexModule} from "nestjs-knex"

import {UsersService} from "./users.service"

describe(`UsersService`, () => {
  let service: UsersService

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
      ],
      providers: [UsersService],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it(`should be defined`, () => {
    expect(service).toBeDefined()
  })
})
