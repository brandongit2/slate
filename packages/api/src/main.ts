import {NestFactory} from "@nestjs/core"
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify"
import config from "config"
import fastifyCookie from "fastify-cookie"

import {AppModule} from "./app.module"
//
;(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  // @ts-ignore
  app.register(fastifyCookie, {secret: config.get(`api.secret`)})

  await app.listen(4000)
})()
