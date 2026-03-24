import Fastify from 'fastify'

const server = Fastify()

server.get('/ping', (_req, _res) => {
  return 'pong\n'
})

const start = async () => {
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

void start()
