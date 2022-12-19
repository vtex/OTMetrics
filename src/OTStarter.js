import { execSync } from 'child_process'
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

import { print } from './utils/prompt.js'
import { getPagesFromBuild } from './OTExecutor.js'

export async function startServering(projectPath, isManualExercising) {
  
  print('▹ Verificando aplicação...')
  await execSync(`cd / && cd ${projectPath} && npm run build`, { encoding: 'utf8' })
  
  if(!isManualExercising) {
    print('▹ Pegando rotas...')
    getPagesFromBuild(projectPath)
  }

  const app = next({ dev: true, dir: projectPath })
  const handle = app.getRequestHandler()

  await app.prepare()
  let server = createServer( async (req, res) => await handle(req, res, parse(req.url, true)))
  server.listen(3000)

  return {
    serverIsListening: server.listening,
    url: `http://localhost:3000`
  }     
}