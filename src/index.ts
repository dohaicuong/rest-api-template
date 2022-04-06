import { server } from './server'

server.listen(4000)
  .catch(error => {
    server.log.error(error)
    process.exit(1)
  })

process.on('SIGTERM', async () => {
  await server.close()
})
