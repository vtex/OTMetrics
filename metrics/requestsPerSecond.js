import { nanoToSec } from "../utils.js";

export function getRequestsPerSecond(spans) {
    let text = `\n ➜ Requisições por segundo:`

    let { firstToHappen, lastToHappen, perSecond } = requestsPerSecond(spans)

    return text
}

function requestsPerSecond( spans ) {
    
    let firstToHappen = spans[0];
    let lastToHappen = spans[0];
    
    spans.forEach((span) => {
        if( span.startTime[0] < firstToHappen.startTime[0] ) {
            firstToHappen = span
        }

        if( span.endTime[0] > lastToHappen.endTime[0] ) {
            lastToHappen = span
        }
    })    
    
    let timeLapse = lastToHappen.endTime[0] - firstToHappen.startTime[0]
    
    return {
        firstToHappen,
        lastToHappen,
        perSecond: nanoToSec(timeLapse) / spans.length
    }

}
