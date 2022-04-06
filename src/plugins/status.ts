import { FastifyPluginAsync } from 'fastify'

export const status: FastifyPluginAsync = async (server, options) => {
  server.get(
    `/`,
    {
      schema: {
        description: 'Health check endpoint',
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              up: { type: 'boolean' }
            }
          }
        }
      }
    },
    async function (req, res) {
      return { up: true }
    }
  )
}
