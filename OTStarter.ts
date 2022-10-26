const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

module.exports = {

  startServering: async () => {
    return app.prepare()
      .then(() => {
        createServer(async (req: any, res: any) => await handle(req, res, parse(req.url, true)))
          .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`)
          })
    })
  }
  
}
