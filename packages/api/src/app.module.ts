import {Module} from "@nestjs/common"
import {GraphQLModule} from "@nestjs/graphql"
import {TypeOrmModule} from "@nestjs/typeorm"
import path from "path"

import {User} from "./users/entities/user.entity"
import {UsersModule} from "./users/users.module"

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), `schema.gql`),
    }),
    TypeOrmModule.forRoot({
      type: `mongodb`,
      host: `localhost`,
      port: 27020,
      authSource: `admin`,
      database: `slate`,
      username: `root`,
      password: `password`,
      logging: true,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User],
    }),
    UsersModule,
  ],
})
export class AppModule {}
