import { biggestLatency, requestsPerSecond, statusOfRequests } from './functions.js'
import { nanoToSec, translateSpanKind } from './utils.js'

export function startProcessing( spans ) {

    console.log(spans)

    let text = '\n\n ◦◦◦◦◦◦◦◦ OTMETRICS ◦◦◦◦◦◦◦◦ \n';

    if(spans.length > 0 ) {
        
        text += getStatusOfRequests(spans)
        text += '\n'
        text += getBiggestLatency(spans)
        text += '\n'
        text += getRequestsPerSecond(spans)

    } else {
        text += '\n ✕ Nenhum tracing capturado'
    }

    return text + '\n';
}

function getBiggestLatency(spans) {    
    let text = '\n ➜ Maior latência: \n'

    let biggestSpan = biggestLatency(spans)

    text += `     Nome: ${biggestSpan.name} ${biggestSpan.attributes?.['http.url'] ? '- ' + biggestSpan.attributes?.['http.url'] : ''}\n`
    text += `     Duração: ${nanoToSec(biggestSpan.duration[1]).toFixed(5)} segundos\n`
    text += `     Tipo: ${translateSpanKind(biggestSpan.kind)}`

    return text
}

function getStatusOfRequests(spans) {
    let text = '\n ➜ Relatório de Requisições: \n'

    let { ok, error, errorRequests, unSet } = statusOfRequests(spans)

    text += `   ‧ Com sucesso: ${ok}\n`
    text += `   ‧ Com erro: ${error}\n`
    text += `   ‧ Não setadas: ${unSet}`

    if(errorRequests.length > 0) {
        text += '\n\n     - Requisições com erros:'
    }
    
    errorRequests.forEach((span) => {
        text += `\n       ${span.name} ${span.attributes?.['http.url'] ? '- ' + span.attributes?.['http.url'] : ''}`
    })

    return text
}

function getRequestsPerSecond(spans) {
    let text = `\n ➜ Requisições por segundo: ${ requestsPerSecond(spans) } segundos`
}