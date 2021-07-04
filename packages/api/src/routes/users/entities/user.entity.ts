import {Field, ObjectType} from "@nestjs/graphql"

import {UuidScalar} from "@api/src/uuid.scalar"

@ObjectType()
export class UserEntity {
  @Field(() => UuidScalar)
  id!: string

  @Field()
  firstName!: string

  @Field()
  lastName!: string

  @Field()
  email!: string
}
