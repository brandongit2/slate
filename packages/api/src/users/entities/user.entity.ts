import {Field, ObjectType} from "@nestjs/graphql"

import {UuidScalar} from "@api/src/uuid.scalar"

@ObjectType()
export class User {
  @Field(() => UuidScalar)
  id!: string

  @Field()
  name!: string

  @Field()
  email!: string
}
