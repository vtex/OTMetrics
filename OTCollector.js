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
  return await sdk.start()
    .then(() => startServering())
}

export function getFinishedSpans() {
  return traceExporter.getFinishedSpans()
}