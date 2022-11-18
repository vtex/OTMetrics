import { arrow, jumpOneLine, print, tab, dot } from '../utils.js'

export function getNetworkInformation(spans) {

    jumpOneLine()
    print(arrow() + 'Informações de Rede')
    jumpOneLine()

    print(tab() + 'Para a montagem do servidor alguns processos são executados para garantir o funcionamento.')

    let networkSpans = [
        { name: 'DNS',  spanName: 'dns.lookup'},
        { name: 'TCP',  spanName: 'tcp.connect'},
        { name: 'TLS', spanName: 'tls.connect'}
    ]

    networkSpans.forEach(({ name, spanName }) => {
        
        jumpOneLine()

        let span = getSpanByName(spans, spanName)
        
        if(span) {    
            print(tab() + dot() + name)
            printNetworkAttibures(span)
        } else {
            print(tab() + dot() + 'Não foi encontrado nenhum trace sobre', name)
        }
        
    })

}

function printNetworkAttibures(span) {
    Object.entries(span.attributes).forEach(([ key, value ]) => {
        print(tab(3) + key, value)
    })
}

function getSpanByName(spans, name) {
    for( let span of spans ) {
        if(span.name === name) {
            return span
        }
    }
}

