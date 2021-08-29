import {Field, InputType} from "@nestjs/graphql"
import {IsString} from "class-validator"

@InputType()
export class CreateUserInput {
  @Field({description: `The user's first name.`})
  @IsString()
  firstName!: string

  @Field({description: `The user's last name.`})
  @IsString()
  lastName!: string

  @Field({description: `The user's email address.`})
  @IsString()
  email!: string

  @Field({description: `The user's password.`})
  @IsString()
  password!: string
}
