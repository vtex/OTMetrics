const tracer = require("./config/tracing")

function getFinishedSpans() {
    return tracer.getFinishedSpans()
}

module.exports = {
    getFinishedSpans
}