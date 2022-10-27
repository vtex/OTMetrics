import { startCollecting, getFinishedSpans } from "./OTCollector.js"
import { startProcessing } from "./OTProcessor.js"

startCollecting()

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
