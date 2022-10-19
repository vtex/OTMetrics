const { start, getFinishedSpans } = require("./OTCollector")
const { startProcessing } = require("./OTProcessor");

start()

function onInterrupt() {
    console.log(
        startProcessing(
            getFinishedSpans()
        )
    )

    process.exit();
}
  
process.on('SIGINT', onInterrupt)  // CTRL+C
process.on('SIGQUIT', onInterrupt) // Keyboard quit
process.on('SIGTERM', onInterrupt) // `kill` command
