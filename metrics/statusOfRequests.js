import { arrow, dot, jumpOneLine, line, print, tab } from '../utils.js'

export function getStatusOfRequests(spans) {

    let { ok, error, errorRequests, unSet } = statusOfRequests(spans)
    
    jumpOneLine()
    print(arrow() + 'Status das Requisições:')
    jumpOneLine()

    print(tab() + dot() + 'Não informadas:', unSet) 
    print(tab() + dot() + 'Com sucesso:', ok)
    print(tab() + dot() + 'Com erro:', error)

    if(errorRequests.length > 0) {
        jumpOneLine()
        print(tab(2) + 'Requisições com erros:')
    }
    
    errorRequests.forEach((span) => {
        
        let name = span.name
        let link = span.attributes?.['http.url'] ? '- ' + span.attributes['http.url'] : ''
        let hasError = !!span.status?.message
        let errorMessage = hasError ? span.status.message : ''
        
        jumpOneLine()
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