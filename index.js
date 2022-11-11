import { startCollecting, getFinishedSpans } from "./OTCollector.js"
import { startProcessing } from "./OTProcessor.js"

const startDate = await startCollecting()

async function onInterrupt() {

    const endDate = Date.now()

    console.log(
        await startProcessing(
            getFinishedSpans(), 
            startDate,
            endDate
        )
    )

    process.exit();
}
  
process.on('SIGINT', await onInterrupt)  // CTRL+C
process.on('SIGQUIT', await onInterrupt) // Keyboard quit
process.on('SIGTERM', await onInterrupt) // `kill` command
