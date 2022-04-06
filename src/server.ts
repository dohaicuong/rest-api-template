// SETUP SERVER
import fastify, { FastifyServerOptions } from 'fastify'

// PLUGINS
import cors from 'fastify-cors'
import prismaPlugin from './plugins/prisma'
import { shutdown } from './plugins/shutdown'
import { status } from './plugins/status'
import fastifySwagger from 'fastify-swagger'

// ROUTES
import { post } from './domains/post'

export const createServer = (opts: FastifyServerOptions = {}) => fastify(opts)
  .register(shutdown)
  .register(cors, {})
  .register(prismaPlugin)
  .register(fastifySwagger, {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'testing the fastify swagger api',
        version: '1.0.0'
      },
    },
    exposeRoute: true
  })
  .register(status)
  .register(post)

export const startServer = async () => {
  const server = createServer({
    logger: {
      level: 'info',
    },
    disableRequestLogging: process.env.ENABLE_REQUEST_LOGGING !== 'true',
  })

  const port = process.env.PORT ?? 4000
  await server.listen(port, '0.0.0.0')
    .catch(error => {
      server.log.error(error)
      process.exit(1)
    })
}