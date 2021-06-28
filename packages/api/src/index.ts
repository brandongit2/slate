import "reflect-metadata"

import {ApolloServer} from "apollo-server-fastify"
import config from "config"
import fastify from "fastify"
import fastifyCookie from "fastify-cookie"
import fastifyHelmet from "fastify-helmet"
import fastifyPassport from "fastify-passport"
import {buildSchema} from "type-graphql"

import {AuthResolver} from "./auth/auth.resolver"
//
;(async () => {
  const schema = await buildSchema({
    resolvers: [AuthResolver],
  })

  const server = new ApolloServer({
    schema,
    playground: true,
  })
  await server.start()

  const app = fastify({
    logger: true,
  })
  app.register(fastifyCookie, {secret: config.get(`api.secret`)})
  app.register(fastifyHelmet)
  app.register(fastifyPassport.initialize())
  app.register(server.createHandler())

  await app.listen(config.get(`api.port`))
  console.info(
    `Fastify server started on port ${config.get(`api.port`)}. GraphQL Playground available at ${server.graphqlPath}.`,
  )
})()
