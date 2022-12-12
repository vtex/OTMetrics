import { print, jumpLine, tab, date, duration, dotLine } from './utils/prompt.js'
import * as metrics from './metrics/index.js'

export async function startProcessing( spans, startDate, endDate ) {
    jumpLine()
    print(dotLine(2), 'INFORMAÇÕES')
    jumpLine()

    print(tab() + 'Início:', date(startDate))
    print(tab() + 'Fim:', date(endDate))
    print(tab() + 'Duração:', duration(startDate, endDate))
    jumpLine()

    print(tab() + 'Durante este periodo foram capturados', spans.length, 'tracing(s)!')

    if(spans.length > 0 ) {
        
        jumpLine()
        print(dotLine(2), 'RELATÓRIO')

        await takeAllMetricsAndRun(spans)
    }

    jumpLine()
}

async function takeAllMetricsAndRun(spans) {
    await Promise.all(
        Object.entries(metrics).map(([ _, func ]) =>
          func(spans)
        )
    )
}