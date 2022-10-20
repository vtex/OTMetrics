import { ReadableSpan } from '@opentelemetry/sdk-trace-base'

import { biggestLatency } from './functions'

export function startProcessing( spans: ReadableSpan[] ) {
    let text = '\n\n ===== OTMetrics ===== \n';

    text += '\n - Maior latência: '

    return text;
}
