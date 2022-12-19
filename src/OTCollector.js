import opentelemetry from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

import { startServering } from './OTStarter.js'
import { dotLine, jumpLine, print, errorMessage, quit } from './utils/prompt.js'

const traceExporter = new opentelemetry.tracing.InMemorySpanExporter()

const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations()
  ]
});

export async function startCollecting(projectPath, isManualExercising) {

  jumpLine()  
  print(dotLine(2), 'INICIANDO')
  jumpLine()
  
  print('▹ Iniciando coletor...')
  await sdk.start()
  print('▸ Coletor pronto!')

  jumpLine()

  print('▹ Iniciando projeto...')
  let { serverIsListening, url } = await startServering(projectPath, isManualExercising)
  
  if(!serverIsListening) {
      jumpLine()
      errorMessage('Por algum motivo o servidor não foi inicializado!')
      quit()
  }

  print('▸ Projeto em execução!')

  return url
}

export function getFinishedSpans() {
  return traceExporter.getFinishedSpans()
}

process.on('exit', async () => {
  await sdk.shutdown()
})