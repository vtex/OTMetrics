import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectPath = __dirname.replace('/node_modules/otmetrics', '')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port, dir: projectPath })
const handle = app.getRequestHandler()

export async function startServering() {
  return app.prepare()
    .then(() => {
      createServer(async (req, res) => await handle(req, res, parse(req.url, true)))
        .listen(port, () => {
          console.log(`> Ready on http://${hostname}:${port}`)
        })
  })
}
