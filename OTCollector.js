import opentelemetry from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

import { startServering } from './OTStarter.js'
import { jumpOneLine, print, showError } from './utils.js';

const traceExporter = new opentelemetry.tracing.InMemorySpanExporter()

const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations()
  ]
});

export async function startCollecting(projectPath) {

  jumpOneLine()  
  print(dotLine(2), 'INICIANDO')
  jumpOneLine()
  
  print('▹ Iniciando coletor...')
  await sdk.start()

  print('▹ Iniciando projeto...')
  let serverIsListening = await startServering(projectPath)
  
  if(!serverIsListening) {
      jumpOneLine()
      showError('Por algum motivo o servidor não foi inicializado!')
      process.exit()
  }

  print('▸ Tudo OK!')
  
}

export function getFinishedSpans() {
  return traceExporter.getFinishedSpans()
}