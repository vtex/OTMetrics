import { ReadableSpan } from '@opentelemetry/sdk-trace-base'

export function biggestLatency( spans: ReadableSpan[] ){
    let biggest : ReadableSpan | null  = null;

    spans.forEach((span) => {
        if(span.duration > ( biggest?.duration ?? 0 )) {
            biggest == span
        }
    })

    return biggest
}
