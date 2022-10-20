import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

export async function startServering() {
  return app.prepare()
    .then(() => {
      createServer(async (req: any, res: any) => await handle(req, res, parse(req.url, true)))
        .listen(port, () => {
          console.log(`> Ready on http://${hostname}:${port}`)
        })
  })
}
