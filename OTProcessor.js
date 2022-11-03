import { biggestLatency, statusOfRequests } from './functions.js'
import { nanoToSec, spanToString, translateSpanKind } from './utils.js'

export function startProcessing( spans ) {
    let text = '\n\n ◦◦◦◦◦◦◦◦ OTMETRICS ◦◦◦◦◦◦◦◦ \n';

    if(spans.length > 0 ) {
        
        text += getStatusOfRequests(spans)
        text += getBiggestLatency(spans)

    } else {
        text += '\n ✕ Nenhum tracing capturado'
    }

    return text + '\n';
}

function getBiggestLatency(spans) {    
    let text = '\n ➜ Maior latência: \n'

    let biggestSpan = biggestLatency(spans)

    text += `     Nome: ${biggestSpan.name} ${biggestSpan.attributes?.['http.url'] && '- ' + biggestSpan.attributes?.['http.url']}\n`
    text += `     Duração: ${nanoToSec(biggestSpan.duration[1]).toFixed(5)} seconds\n`
    text += `     Tipo: ${translateSpanKind(biggestSpan.kind)}`

    return text
}

function getStatusOfRequests(spans) {
    let text = '\n ➜ Relatório de Requests: \n'

    let { ok, error, unSet } = statusOfRequests(spans)

    text += `   ‧ Com sucesso: ${ok}\n`
    text += `   ‧ Com erro: ${error}\n`
    text += `   ‧ Não setadas: ${unSet}`

    return text
}