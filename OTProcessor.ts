const { ReadableSpan } = require('@opentelemetry/sdk-trace-base')

const { biggestLatency } = require('./functions')

module.exports = {

    startProcessing : ( spans: typeof ReadableSpan[] ) => {
        let text = '\n\n ===== OTMetrics ===== \n';
    
        text += '\n - Maior latência: ' + biggestLatency(spans)
    
        return text;
    }
    
}