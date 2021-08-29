import {Field, ObjectType} from "@nestjs/graphql"

import {UuidScalar} from "src/uuid.scalar"

@ObjectType()
export class User {
  @Field(() => UuidScalar, {description: `The user's ID.`})
  id!: string

  @Field({description: `The user's first name.`})
  firstName!: string

  @Field({description: `The user's last name.`})
  lastName!: string

  @Field({description: `The user's email.`})
  email!: string
}

export class UserWithPassword extends User {
  password!: string
}
