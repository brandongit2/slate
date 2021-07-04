import type {FastifyReply, FastifyRequest} from "fastify"

import {UserEntity} from "./routes/users/entities/user.entity"

export type FastifyExecutionContext = {request: FastifyRequest & {user: UserEntity}; reply: FastifyReply}
