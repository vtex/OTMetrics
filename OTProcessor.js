import { print, jumpOneLine, tab, showDate, showDuration, dotLine} from './utils.js';
import * as metrics from './metrics/index.js'

export async function startProcessing( spans, startDate, endDate ) {
    
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