import {ExecutionContext, createParamDecorator} from "@nestjs/common"
import {GqlExecutionContext} from "@nestjs/graphql"

import {FastifyExecutionContext} from "#/FastifyExecutionContext"

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context).getContext() as FastifyExecutionContext

  return ctx.request.user
})
