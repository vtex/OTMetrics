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

export async function startCollecting() {
  await sdk.start()
    .then(() => console.log('Tracing initialized'))
    .then(() => startServering())

  return Date.now()
}

export function getFinishedSpans() {
  return traceExporter.getFinishedSpans()
}