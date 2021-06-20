import {Field, InputType, PartialType} from "@nestjs/graphql"
import {IsString} from "class-validator"

import {CreateUserInput} from "./createUser.input"

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({description: `The ID of the user.`})
  @IsString()
  id!: string

  @Field({description: `The user's full name.`})
  @IsString()
  name!: string

  @Field({description: `The user's email address.`})
  @IsString()
  email!: string
}
