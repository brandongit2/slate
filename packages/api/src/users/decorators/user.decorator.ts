import {FastifyExecutionContext} from "@api/src/FastifyContext"

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context).getContext() as FastifyExecutionContext

  return ctx.request.user
})
