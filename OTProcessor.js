import { ReadableSpan } from '@opentelemetry/sdk-trace-base'

import { biggestLatency } from './functions.js'

export function startProcessing( spans ) {
    let text = '\n\n ===== OTMetrics ===== \n';

    text += '\n - Maior latência: ' + biggestLatency(spans)

    return text;
}
