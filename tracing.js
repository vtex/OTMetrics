'use strict'

const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const { startServer } = require('./server');

const traceExporter = new opentelemetry.tracing.InMemorySpanExporter()

const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations()
  ]
});

module.exports = {
  start: () => {
    sdk.start()
      .then(() => console.log('Tracing initialized'))
      .then(() => startServer())
  },

  getFinishedSpans: () => traceExporter.getFinishedSpans()
}