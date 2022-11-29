'use strict'

import opentelemetry from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

import { startServering } from './OTStarter.js'

const traceExporter = new opentelemetry.tracing.InMemorySpanExporter()

const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations()
  ]
});

export async function startCollecting( projectPath ) {
  return await sdk.start()
    .then(() => startServering(projectPath))
}

export function getFinishedSpans() {
  return traceExporter.getFinishedSpans()
}