import { nanoToSec, translateSpanKind } from '../utils.js'

export function getBiggestLatency( spans ) {
    let text = '\n ➜ Maior latência:'
    
    let biggestSpan = biggestLatency(spans)
    
    text += `\n     Nome: ${biggestSpan.name} ${biggestSpan.attributes?.['http.url'] ? '- ' + biggestSpan.attributes?.['http.url'] : ''}`
    text += `\n     Duração: ${nanoToSec(biggestSpan.duration[1]).toFixed(5)} segundos`
    text += `\n     Tipo: ${translateSpanKind(biggestSpan.kind)}`
    
    return text
}

function biggestLatency( spans ){

    let biggest = spans[0];

    spans.forEach((span) => {
        if( span.duration[0] > biggest.duration[0]) {
            biggest = span
        }
    })

    return biggest
}