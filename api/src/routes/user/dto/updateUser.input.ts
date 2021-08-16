import {Field, InputType, PartialType} from "@nestjs/graphql"
import {IsString} from "class-validator"

import {CreateUserInput} from "./createUser.input"

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({description: `The ID of the user.`})
  @IsString()
  id!: string

  @Field({description: `The user's first name.`})
  @IsString()
  firstName!: string

  @Field({description: `The user's last name.`})
  @IsString()
  lastName!: string

  @Field({description: `The user's email address.`})
  @IsString()
  email!: string
}
