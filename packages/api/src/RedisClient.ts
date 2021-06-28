import redis from "redis"
import {MiddlewareFn, createParamDecorator} from "type-graphql"

import {FastifyExecutionContext as FastifyContext} from "./FastifyContext"

export const RedisMiddleware: MiddlewareFn<FastifyContext> = async ({context}, next) => {
  const redisClient = redis.createClient()
  context.request.redis = redisClient
}

export function Redis() {
  return createParamDecorator<FastifyContext>(({context}) => {
    return context.request.redis
  })
}
