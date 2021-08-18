import {ValidationPipe} from "@nestjs/common"
import {NestFactory} from "@nestjs/core"
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify"
import fastifyCookie from "fastify-cookie"
import fastifyHelmet from "fastify-helmet"

import {AppModule} from "./app.module"
//
;(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  app.register(fastifyCookie)
  app.register(fastifyHelmet)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.API_PORT!)
})()
