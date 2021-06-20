import {Field, InputType} from "@nestjs/graphql"
import {IsString} from "class-validator"

@InputType()
export class CreateUserInput {
  @Field({description: `The user's full name.`})
  @IsString()
  name!: string

  @Field({description: `The user's email address.`})
  @IsString()
  email!: string
}
