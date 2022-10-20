import { SpanContext } from '@opentelemetry/types'

import { biggestLatency } from './functions'

export function startProcessing( spans: SpanContext[] ) {
    let text = '\n\n ===== OTMetrics ===== \n';

    text += '\n - Maior latência: '

    return text;
}
