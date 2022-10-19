const { start, getFinishedSpans } = require("./tracing")

start()

function onInterrupt() {
    console.log(getFinishedSpans())    
    process.exit();
}
  
process.on('SIGINT', onInterrupt)  // CTRL+C
process.on('SIGQUIT', onInterrupt) // Keyboard quit
process.on('SIGTERM', onInterrupt) // `kill` command
