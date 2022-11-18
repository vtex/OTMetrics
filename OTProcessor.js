import { print, jumpOneLine, tab, showDate, showDuration, dotLine} from './utils.js';
import * as metrics from './metrics/index.js'

export async function startProcessing( spans, startDate, endDate ) {

    jumpOneLine()
    jumpOneLine()
    print(dotLine(4), 'OTMETRICS', dotLine(4))
    jumpOneLine()
    
    print('Um pacote NodeJs instalável e funcional para aplicações em NextJS. Que, ao ser executado, disponibiliza uma versão local da aplicação para ser executada e depois disso monitora o servidor da aplicação para verificar seu funcionamento, o que chega e sai dele.')
    jumpOneLine()
    
    print(dotLine(2), 'INFORMAÇÕES')
    jumpOneLine()

    print(tab() + 'Início:', showDate(startDate))
    print(tab() + 'Fim:', showDate(endDate))
    print(tab() + 'Duração:', showDuration(startDate, endDate))
    jumpOneLine()

    print(tab() + 'Durante este periodo foram capturados', spans.length, 'tracing(s)!')

    if(spans.length > 0 ) {
        
        jumpOneLine()
        print(dotLine(2), 'RELATÓRIO')

        await takeAllMetricsAndRun(spans)
    }

    jumpOneLine()
}

async function takeAllMetricsAndRun(spans) {

    await Promise.all(
        Object.entries(metrics).map(([ _, func ]) =>
          func(spans)
        )
    )
}