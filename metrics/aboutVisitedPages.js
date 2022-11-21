import { arrow, asterisk, jumpOneLine, line, print, tab } from '../utils.js'

export function getAboutVisitedPages( spans ) {

    let pages = visitedPages(spans)
    
    let [ tracesOfPages, totalOfTraces] = getTracesOfPages(pages, spans)

    jumpOneLine()
    print(arrow() + 'Páginas Visitadas:')
    jumpOneLine()

    let average = (totalOfTraces/pages.length).toFixed(3).replace('.', ',')

    print(tab(2) + 'Durante o uso você visitou', pages.length, 'página(s)!')
    print(tab(2) + 'Este acesso trouxe', totalOfTraces, 'requisição(ões) para o servidor.')
    print(tab(2) + 'A média de requisições por página foi:', average)

    jumpOneLine()

    print(tab(2) + 'Para mais detalhes, essas foram as requisições por página:')

    pages.forEach((page) => {
        
        let link = page.attributes['http.url']
        let spanId = page._spanContext.spanId
        
        jumpOneLine()
        print(tab(2) + line() + link)

        tracesOfPages[spanId].forEach((trace) => {
            let name = trace.name
            let link = trace.attributes?.['http.url'] ? '- ' + trace.attributes['http.url'] : ''
        
            print(tab(3) + name, link)
        })

    })
    
    jumpOneLine()

    print(tab(2) + asterisk() + 'Gostariamos de lembrar que em alguns casos não é proveitoso que uma página faça tantas requisições ao servidor para montar uma página. De acordo com a situação usar a técnica de SSG traga otimizações!')

}

function visitedPages(spans) {
    return spans.filter((span) => {
        let link = span.attributes?.['http.url']
        
        if(!link) return false
        return link.includes('localhost:3000') && !link.includes('localhost:3000/_next')
    })
}

function getTracesOfPages(pages, spans) {
    
    let traces = {}
    let total = 0
    let tracesWithParent = spans.filter((span) => !!span.parentSpanId)
    
    pages.forEach((page) => {
        
        traces[page._spanContext.spanId] = []

        tracesWithParent.forEach((trace) => {
            if(trace.parentSpanId === page._spanContext.spanId) {
                traces[page._spanContext.spanId].push(trace)
                total += 1
            }
        })
    })

    return [ traces, total ]
}