import {Field, ObjectType} from "@nestjs/graphql"
import {Column, Entity, ObjectIdColumn} from "typeorm"

@ObjectType()
@Entity()
export class User {
  @Field()
  @ObjectIdColumn()
  id!: string

  @Field()
  @Column()
  name!: string

  @Field()
  @Column()
  email!: string
}
