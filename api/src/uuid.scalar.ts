import {CustomScalar, Scalar} from "@nestjs/graphql"
import {Kind, ValueNode} from "graphql"

@Scalar(`UUID`)
export class UuidScalar implements CustomScalar<string, string> {
  description = `The \`UUID\` scalar type represents a v4 UUID.`

  parseValue(value: string) {
    return value
  }

  serialize(value: string) {
    return value
  }

  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.STRING) {
      return ast.value
    } else {
      return null
    }
  }
}
