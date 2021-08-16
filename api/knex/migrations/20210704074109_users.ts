import Knex from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(`users`, (table) => {
    table.string(`id`).primary()
    table.string(`firstName`).notNullable()
    table.string(`lastName`).notNullable()
    table.string(`email`).notNullable()
    table.string(`password`).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(`users`)
}
