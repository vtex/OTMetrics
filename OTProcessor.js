import { formatDistance, format } from 'date-fns'
import { ptBR } from 'date-fns/locale/index.js'
import * as metrics from './metrics/index.js'

export async function startProcessing( spans, startDate, endDate ) {

    let text = '\n\n•••••••••••• OTMETRICS ••••••••••••';

    text += '\n\nUm pacote NodeJs instalável e funcional para aplicações em NextJS. Que, ao ser executado, disponibiliza uma versão local da aplicação para ser executada e depois disso monitora o servidor da aplicação para verificar seu funcionamento, o que chega e sai dele.'

    text += '\n\n•••••• INFORMAÇÕES'

    text += '\n\n ‧ Início ' + format(startDate, 'dd/MM/yyyy HH:mm:ss')
    text += '\n ‧ Fim ' + format(endDate, 'dd/MM/yyyy HH:mm:ss')
    text += '\n ‧ Duração ' + formatDistance(startDate, endDate, { includeSeconds: true, locale: ptBR })
    
    text += '\n\n ‧ Durante este periodo foram capturados ' + spans.length + ' tracing(s)!'
    
    if(spans.length > 0 ) {
        
        text += '\n\n•••••• RELATÓRIO'

        text += await takeAllMetricsAndRun(spans)
    }

    return text + '\n';
}

async function takeAllMetricsAndRun(spans) {

    let text = ''

    await Promise.all(
        Object.entries(metrics).map(([ _, func ]) =>
          text += '\n' + func(spans)
        )
    )

    return text
}