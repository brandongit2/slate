import Knex from "knex"

import {User} from "#/routes/user/user.entity"
import users from "../seedData/users.json"

export async function seed(knex: Knex): Promise<void> {
  await knex.table(`users`).del()

  await knex.table<User>(`users`).insert(users)
}
