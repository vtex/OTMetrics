import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

export async function startServering(projectPath) {
  
  const app = next({ dev, hostname, port, dir: projectPath })
  const handle = app.getRequestHandler()

  await app.prepare()
  let server = createServer( async (req, res) => await handle(req, res, parse(req.url, true)))
  server.listen(port)

  return {
    serverIsListening: server.listening,
    url: `http://${hostname}:${port}`
  }
     
}