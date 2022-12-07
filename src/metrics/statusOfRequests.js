import { arrow, dot, jumpLine, line, print, tab } from '../utils/prompt.js'

export function getStatusOfRequests(spans) {

    let { ok, error, errorRequests, unSet } = statusOfRequests(spans)
    
    jumpLine()
    print(arrow() + 'Status das Requisições:')
    jumpLine()

    print(tab() + dot() + ok, 'traces com status de SUCESSO')
    print(tab() + dot() + error, 'traces com status de ERRO')
    print(tab() + dot() + unSet, 'traces não receberam status de sucesso ou erro') 

    if(errorRequests.length > 0) {
        jumpLine()
        print(tab(2) + 'Requisições com erros:')
    }
    
    errorRequests.forEach((span) => {
        
        let name = span.name
        let link = span.attributes?.['http.url'] ? '- ' + span.attributes['http.url'] : ''
        let hasError = !!span.status?.message
        let errorMessage = hasError ? span.status.message : ''
        
        jumpLine()
        print(tab(2) + line() + name, link)

        if (hasError) print(tab(3) + 'Erro:', errorMessage)
        
    })
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