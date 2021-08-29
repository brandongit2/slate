import {KnexModule} from "@brandonnpm2/nestjs-knex"
import {RedisModule} from "@brandonnpm2/nestjs-redis"
import {Module} from "@nestjs/common"
import {ConfigModule, ConfigService} from "@nestjs/config"
import {GraphQLModule} from "@nestjs/graphql"
import {RedisOptions} from "ioredis"
import Knex from "knex"
import path from "path"

import {UserModule} from "src/user/user.module"
import {AuthModule} from "src/auth/auth.module"
import {UuidScalar} from "./uuid.scalar"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(process.cwd(), `.env`),
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), `schema.gql`),
      sortSchema: true,
      context: ({request, reply}) => ({request, reply}),
      cors: {
        origin: [`http://localhost:3000`, `https://studio.apollographql.com`],
        credentials: true,
      },
    }),
    KnexModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const knexConfig: Knex.Config = {
          client: `pg`,
          connection: {
            host: configService.get<string>(`POSTGRES_HOSTNAME`),
            port: configService.get<number>(`POSTGRES_PORT`),
            user: configService.get<string>(`POSTGRES_USER`),
            password: configService.get<string>(`POSTGRES_PASSWORD`),
            database: configService.get<string>(`POSTGRES_DB_NAME`),
          },
        }
        return knexConfig
      },
      inject: [ConfigService],
    }),
    RedisModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const redisOptions: RedisOptions = {
          host: configService.get<string>(`REDIS_HOSTNAME`),
          port: configService.get<number>(`REDIS_PORT`),
        }
        return redisOptions
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  providers: [UuidScalar],
})
export class AppModule {}
