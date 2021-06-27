import {Module} from "@nestjs/common"
import {GraphQLModule} from "@nestjs/graphql"
import {TypeOrmModule} from "@nestjs/typeorm"
import config from "config"
import path from "path"

import {AuthModule} from "./auth/auth.module"
import {UserDb} from "./users/entities/userDb.entity"
import {UsersModule} from "./users/users.module"
import {UuidScalar} from "./uuid.scalar"

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), `schema.gql`),
      context: ({request, reply}) => ({request, reply}),
      cors: {
        origin: `http://localhost:3000`,
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: `mongodb`,
      host: `localhost`,
      port: config.get(`db.port`),
      authSource: `admin`,
      database: `slate`,
      username: `root`,
      password: `password`,
      logging: true,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [UserDb],
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [UuidScalar],
})
export class AppModule {}
