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

module.exports = {

  startCollecting: () => {
    sdk.start()
      .then(() => console.log('Tracing initialized'))
      .then(() => startServering())
  },
  
  getFinishedSpans: () => {
    return traceExporter.getFinishedSpans()
  }

}
