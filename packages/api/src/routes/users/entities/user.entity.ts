import {Field, ObjectType} from "@nestjs/graphql"

import {UuidScalar} from "$/uuid.scalar"

@ObjectType()
export class UserEntity {
  @Field(() => UuidScalar, {description: `The user's ID.`})
  id!: string

  @Field({description: `The user's first name.`})
  firstName!: string

  @Field({description: `The user's last name.`})
  lastName!: string

  @Field({description: `The user's email.`})
  email!: string

  // Not included in the GraphQL entity... for obvious reasons
  password!: string
}
