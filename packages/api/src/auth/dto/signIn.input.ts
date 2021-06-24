import {ArgsType, Field, InputType} from "@nestjs/graphql"
import {IsString} from "class-validator"

@ArgsType()
@InputType()
export class SignInInput {
  @Field({description: `The user's email address.`})
  @IsString()
  email!: string

  @Field({description: `The user's password.`})
  @IsString()
  password!: string
}
