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
 
sdk.start()
 .then(() => console.log('Tracing initialized'))
 .then(() => startServer())

function onInterrupt() {
  console.log('oi')

  process.exit();
}

process.on('SIGINT', onInterrupt)  // CTRL+C
process.on('SIGQUIT', onInterrupt) // Keyboard quit
process.on('SIGTERM', onInterrupt) // `kill` command

module.exports = sdk