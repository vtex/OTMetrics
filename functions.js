import { nanoToSec } from "./utils";

export function biggestLatency( spans ){

    let biggest;

    spans.forEach((span) => {

        if( !biggest ) biggest = span;
        else if( span.duration[1] > biggest.duration[1]) {
            biggest == span
        }
    })

    return biggest
}

export function statusOfRequests( spans ){

    let ok = 0;
    let error = 0;
    let errorRequests = [];
    let unSet = 0;

    spans.forEach((span) => {
        if( span.status.code == 0) unSet += 1
        else if( span.status.code == 1) ok += 1
        else if( span.status.code == 2) { 
            error += 1
            errorRequests.push(span)
        }
    })

    return {
        ok,
        error,
        errorRequests,
        unSet
    }
}

export function requestsPerSecond( spans ) {
    
    let firstToHappen;
    
    spans.forEach((span) => {
        if( !firstToHappen ) firstToHappen = span
        else if( span.startTime[1] < firstToHappen.startTime[1] ) {
            firstToHappen = span
        }
    })    
    
    let lastToHappen;

    spans.forEach((span) => {
        if( !lastToHappen ) lastToHappen = span
        else if( span.endTime[1] > lastToHappen.endTime[1] ) {
            lastToHappen = span
        }
    })

    if( firstToHappen && lastToHappen ) {
        let timeLapse = lastToHappen.endTime[1] - firstToHappen.startTime[1]
        
        return nanoToSec(
            timeLapse / spans.length
        )
    }
}
