const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

module.exports = {
  startServer: async () => {
    return app.prepare()
      .then(() => {
        createServer(async (req, res) => {
            const parsedUrl = parse(req.url, true)
            await handle(req, res, parsedUrl)
        }).listen(port, (err) => {
          if (err) throw err
          console.log(`> Ready on http://${hostname}:${port}`)
        })
      })
  }
}