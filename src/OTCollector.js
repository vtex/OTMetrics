import opentelemetry from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

import { startServering } from './OTStarter.js'
import { dotLine, jumpLine, print, error } from './utils/prompt.js';

const traceExporter = new opentelemetry.tracing.InMemorySpanExporter()

const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations()
  ]
});

export async function startCollecting(projectPath) {

  jumpLine()  
  print(dotLine(2), 'INICIANDO')
  jumpLine()
  
  print('▹ Iniciando coletor...')
  await sdk.start()
  print('▸ Coletor pronto!')

  jumpLine()

  print('▹ Iniciando projeto...')
  let { serverIsListening, url } = await startServering(projectPath)
  
  if(!serverIsListening) {
      jumpLine()
      error('Por algum motivo o servidor não foi inicializado!')
      process.exit()
  }

  print('▸ Projeto pronto!')

  return url
  
}

export function getFinishedSpans() {
  return traceExporter.getFinishedSpans()
}