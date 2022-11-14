import { hrTimeToMilliseconds, milliToSec, translateSpanKind } from '../utils.js'

export function getBiggestLatency( spans ) {
    let text = '\n ➜ Maior latência:'
    
    let biggestSpan = biggestLatency(spans)
    
    let latency = milliToSec(
        hrTimeToMilliseconds( biggestSpan.duration )
    )

    text += `\n     Nome: ${biggestSpan.name} ${biggestSpan.attributes?.['http.url'] ? '- ' + biggestSpan.attributes?.['http.url'] : ''}`
    text += `\n     Duração: ${ latency.toFixed(5)} segundos`
    text += `\n     Tipo: ${translateSpanKind(biggestSpan.kind)}`
    
    return text
}

function biggestLatency( spans ){

    let biggest = spans[0];

    spans.forEach((span) => {
        if( hrTimeToMilliseconds(span.duration) > hrTimeToMilliseconds(biggest.duration)) {
            biggest = span
        }
    })

    return biggest
}