module.exports = {

    biggestLatency: ( spans: typeof ReadableSpan[] ) => {
        let biggest : typeof ReadableSpan | null  = null;
    
        spans.forEach((span) => {
            if(span.duration > ( biggest?.duration ?? 0 )) {
                biggest == span
            }
        })
    
        return biggest
    }

}
