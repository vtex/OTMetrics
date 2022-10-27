export function biggestLatency( spans ){
    let biggest = null;

    spans.forEach((span) => {
        if(span.duration > ( biggest?.duration ?? 0 )) {
            biggest == span
        }
    })

    return biggest
}
