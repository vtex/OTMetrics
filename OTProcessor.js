import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale/index.js'
import * as metrics from './metrics/index.js'

export async function startProcessing( spans, startDate, endDate ) {

    let text = '\n\n•••••••••••• OTMETRICS ••••••••••••';

    text += `\n\n ‧ Coletando ${formatDistance(startDate, endDate, { includeSeconds: true, addSuffix: true, locale: ptBR })}.`
    text += `\n ‧ Recebemos ${ spans.length } tracing(s)!`
    
    if(spans.length > 0 ) {
        
        text += '\n\n•••••• RELATÓRIO'

        await Promise.all(
            Object.entries(metrics).map(([ _, func ]) =>
              text += '\n' + func(spans)
            )
        )
    }

    return text + '\n';
}