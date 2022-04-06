import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'

export const post: FastifyPluginAsync = fp(
  async (server, options) => {
    type PostGetParams = {
      id: number
    }
    server.get<{ Params: PostGetParams }>(
      '/post/:id',
      async (request, reply) => {
        console.log(server.prisma)
        console.log(request.params.id)
        reply.status(200).send({ ok: true })
      }
    )

    type PostCreateBody = {
      title: string
      body: string
    }
    server.post<{ Body: PostCreateBody }>(
      '/post/create',
      async (request, reply) => {
        const { body } = request

        const newPost = await server.prisma.post
          .create({
            data: {
              title: body.title,
              body: body.body,
              author_id: 'random_not_yet'
            }
          })
          .catch(error => {
            server.log.error(error)
            reply.status(503).send({ message: 'Something went wrong' })
          })

        reply.status(200).send(newPost)
      }
    )
  }
)
