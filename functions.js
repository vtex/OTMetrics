export function biggestLatency( spans ){

    let biggest = spans[0];

    spans.forEach((span) => {
        if( span.duration[1] > biggest.duration[1]) {
            biggest == span
        }
    })

    return biggest
}

export function statusOfRequests( spans ){

    let ok = 0;
    let error = 0;
    let unSet = 0;

    spans.forEach((span) => {
        if( span.status.code == 0) unSet += 1
        else if( span.status.code == 1) ok += 1
        else if( span.status.code == 2) error += 1
    })

    return {
        ok,
        error,
        unSet
    }
}
