import { hrTimeToMilliseconds, jumpOneLine, milliToSec, print, translateSpanKind, tab, arrow } from '../utils.js'

export function getBiggestLatency( spans ) {
    
    let biggestSpan = biggestLatency(spans)
    
    let latency = milliToSec(
        hrTimeToMilliseconds( biggestSpan.duration )
    )
    
    let name = biggestSpan.name
    let link = biggestSpan.attributes?.['http.url'] ? '- ' + biggestSpan.attributes?.['http.url'] : ''
    let latencyFixed = latency.toFixed(5).replace('.', ',')
    let kind = translateSpanKind(biggestSpan.kind)
    
    jumpOneLine()
    print(arrow() + 'Maior latência:')
    jumpOneLine()

    print(tab(2) + 'Nome:', name, link)
    print(tab(2) + 'Duração:', latencyFixed, 'segundos')
    print(tab(2) + 'Tipo:', kind)
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