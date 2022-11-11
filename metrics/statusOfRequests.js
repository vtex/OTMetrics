export function getStatusOfRequests(spans) {
    let text = '\n ➜ Relatório de Requisições:'

    let { ok, error, errorRequests, unSet } = statusOfRequests(spans)

    text += `\n   ‧ Com sucesso: ${ok}`
    text += `\n   ‧ Com erro: ${error}`
    text += `\n   ‧ Não setadas: ${unSet}`

    if(errorRequests.length > 0) {
        text += '\n\n     - Requisições com erros:'
    }
    
    errorRequests.forEach((span) => {
        text += `\n       ${span.name} ${span.attributes?.['http.url'] ? '- ' + span.attributes?.['http.url'] : ''}`
    })

    return text
}

function statusOfRequests( spans ){

    let ok = 0;
    let error = 0;
    let errorRequests = [];
    let unSet = 0;

    spans.forEach((span) => {
        if( span.status.code == 0) unSet += 1
        else if( span.status.code == 1) ok += 1
        else if( span.status.code == 2) { 
            error += 1
            errorRequests.push(span)
        }
    })

    return {
        ok,
        error,
        errorRequests,
        unSet
    }
}