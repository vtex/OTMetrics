import { biggestLatency } from './functions.js'
import { spanToString } from './utils.js'

export function startProcessing( spans ) {
    let text = '\n\n ◦◦◦◦◦◦◦◦ OTMETRICS ◦◦◦◦◦◦◦◦ \n';

    if(spans.length > 0 ) {

        text += '\n ➜ Maior latência: \n' + spanToString(biggestLatency(spans))

    } else {
        text += '\n ✕ Nenhum tracing capturado'
    }

    return text + '\n';
}
