import type {FastifyReply, FastifyRequest} from "fastify"

import {User} from "#/routes/user/user.entity"

export type FastifyExecutionContext = {
  request: FastifyRequest & {user: Omit<User, `password`>}
  reply: FastifyReply
}
