const tracer = require("./config/tracing")

export function getFinishedSpans() {
    return tracer.getFinishedSpans()
}