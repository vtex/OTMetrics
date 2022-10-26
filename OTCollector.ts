'use strict'

const opentelemetry = require('@opentelemetry/sdk-node')
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')

const { startServering } = require('./OTStarter')

const traceExporter = new opentelemetry.tracing.InMemorySpanExporter()

const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations()
  ]
});

export function startCollecting() {
  sdk.start()
    .then(() => console.log('Tracing initialized'))
    .then(() => startServering())
}

export function getFinishedSpans() {
  return traceExporter.getFinishedSpans()
}
