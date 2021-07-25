import {Knex} from "knex"

import {UserEntity} from "$routes/users/entities/user.entity"
import users from "../seedData/users.json"

export async function seed(knex: Knex): Promise<void> {
  await knex.table(`users`).del()

  await knex.table<UserEntity>(`users`).insert(users)
}
