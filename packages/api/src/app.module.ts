import {KnexModule} from "@brandonnpm2/nestjs-knex"
import {RedisModule} from "@brandonnpm2/nestjs-redis"
import {Module} from "@nestjs/common"
import {GraphQLModule} from "@nestjs/graphql"
import config from "config"
import path from "path"

import {AuthModule} from "./routes/auth/auth.module"
import {UsersModule} from "./routes/users/users.module"
import {UuidScalar} from "./uuid.scalar"

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), `schema.gql`),
      context: ({request, reply}) => ({request, reply}),
      cors: {
        origin: [`http://localhost:3000`, `https://studio.apollographql.com`],
        credentials: true,
      },
    }),
    KnexModule.register({
      client: `pg`,
      connection: {
        user: `postgres`,
        password: `password`,
        database: `slate`,
        port: config.get(`db.port`),
      },
    }),
    RedisModule.register({
      port: config.get(`redis.port`),
      host: `localhost`,
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [UuidScalar],
})
export class AppModule {}
