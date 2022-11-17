import { hrTimeToMilliseconds, milliToSec } from "../utils.js";

export function getRequestsPerSecond(spans, startDate, endDate) {
    let text = `\n ➜ Atividades por segundo:`

    let { firstToHappen, lastToHappen, perSecond } = requestsPerSecond(spans)

    return text
}

function requestsPerSecond( spans ) {
    
    let firstToHappen = spans[0];
    let lastToHappen = spans[0];
    
    spans.forEach((span) => {
        if( hrTimeToMilliseconds(span.startTime) < hrTimeToMilliseconds(firstToHappen.startTime) ) {
            firstToHappen = span
        }

        if( hrTimeToMilliseconds(span.endTime) > hrTimeToMilliseconds(lastToHappen.endTime) ) {
            lastToHappen = span
        }
    })    
    
    let timeLapse = lastToHappen.endTime[0] - firstToHappen.startTime[0]
    
    return {
        firstToHappen,
        lastToHappen,
        perSecond: milliToSec(timeLapse) / spans.length
    }

}
