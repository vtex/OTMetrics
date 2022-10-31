export function biggestLatency( spans ){

    let biggest = spans[0];

    console.log(spans)

    spans.forEach((span) => {
        if( span.duration[1] > biggest.duration[1]) {
            biggest == span
        }
    })

    return biggest
}
