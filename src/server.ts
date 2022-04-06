// SETUP SERVER
import fastify from 'fastify'
export const server = fastify({ logger: true })

// REGISTER PLUGINS
import cors from 'fastify-cors'
server.register(cors, {})

import prismaPlugin from './plugins/prisma'
server.register(prismaPlugin)

// REGISTER ROUTES
import { post } from './domains/post'
server.register(post)
