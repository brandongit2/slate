import {Module} from "@nestjs/common"
import {GraphQLModule} from "@nestjs/graphql"
import path from "path"

import {UsersModule} from "./users/users.module"

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), `schema.gql`),
    }),
    UsersModule,
  ],
})
export class AppModule {}
