import {Controller, Get, Req, Res, UseGuards} from "@nestjs/common"

import type {FastifyReply, FastifyRequest} from "fastify"

import {GoogleAuthGuard} from "./guards/googleAuth.guard"

@Controller(`auth`)
export class AuthController {
  @Get(`google`)
  @UseGuards(GoogleAuthGuard)
  googleOAuth() {}

  @Get(`google/callback`)
  @UseGuards(GoogleAuthGuard)
  googleOAuthCallback(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    console.log(req, res)
  }
}
