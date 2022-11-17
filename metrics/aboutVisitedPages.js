export function getAboutVisitedPages( spans ) {
    let text = '\n ➜ Páginas Visitadas:'
        
    let pages = visitedPages(spans)

    text += '\n   ‧ Durante o uso você visitou: ' + pages.length + ' páginas!'

    return text
}

function visitedPages(spans) {
    return spans.filter((span) => {
        let link = span.attributes?.['http.url']
        return link.includes('localhost:3000') && !link.includes('localhost:3000/_next')
    })
}
