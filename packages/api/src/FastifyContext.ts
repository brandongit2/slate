import {RedisClient} from "redis"

import type {FastifyReply, FastifyRequest} from "fastify"

import {User} from "./users/entities/user.entity"

export type FastifyExecutionContext = {request: FastifyRequest & {user: User; redis: RedisClient}; reply: FastifyReply}
